const db = require('./models/db');
const keys = require('./config');
const SpotifyStrategy = require('passport-spotify').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const fetch = require('node-fetch');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const User = require('./models/User');

const Todo = require('./models/Todo');
const Note = require('./models/Notes');
const UserComp = require('./models/Components');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

// Using dependencies
app.use(
  session({
    store: new pgSession({
      pgPromise: db
    }),
    secret: 'dafhgdfh5rr233266314hner', // remember to adjust before deploying
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000 //Adjusts max time of session to 30 days
    }
  })
);

app.use((req, res, next) => {
  let isLoggedIn = req.session.user ? true : false;
  console.log(isLoggedIn);
  next();
});

function protectRoute(req, res, next) {
  let isLoggedIn = req.session.user ? true : false;
  if (isLoggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.use(require('cookie-parser')());

// passport.use(
//   new SpotifyStrategy(
//     {
//       clientID: keys.spotify.client_id,
//       clientSecret: keys.spotify.client_secret,
//       callbackURL: 'http://localhost:3000/auth/spotify/callback'
//     },
//     function(accessToken, refreshToken, expires_in, profile, done) {
//       User.findOrCreate({
//         spotifyId: profile.id
//       }),
//         function(err, user) {
//           return done(err, user);
//         };
//     }
//   )
// );

// passport.use(
//   new TwitterStrategy(
//     {
//       consumerKey: keys.twitter.client_id,
//       consumerSecret: keys.twitter.client_secret,
//       callbackURL: 'http://localhost:4000/auth/twitter/callback'
//     },
//     function(token, tokenSecret, profile, cb) {
//       User.twitterFind(profile.id)
//         .then(result => {
//           console.log(result);
//           let user = result;
//           session.twitterToken = token;

//           return cb(null, user);
//         })
//         .catch(err => {
//           console.log('ABOUT TO PRINT ERROR ++++++++==========');
//           console.log(err, profile);
//           User.updateTwitterId(profile.id, req.session.user.id).then(
//             User.twitterFind(profile.id).then(result => {
//               let user = result;
//               return cb(null, user);
//             })
//           );
//         });
//     }
//   )
// );

passport.use(
  new GithubStrategy(
    {
      clientID: keys.github.client_id,
      clientSecret: keys.github.client_secret,
      callbackURL: 'http://localhost:4000/auth/github/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
      User.githubFind(profile.id)
        .then(result => {
          let user = result;
          console.log(profile);
          console.log(accessToken);
          session.token = accessToken;

          return cb(null, user);
        })
        .catch(err => {
          console.log(err, profile);
          User.updateGithubId(profile.id, 2).then(
            User.githubFind(profile.id).then(result => {
              let user = result;
              return cb(null, user);
            })
          );
        });
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

// app.get('/login/twitter', passport.authenticate('twitter'));

// app.get(
//   '/auth/twitter/callback',
//   passport.authenticate('twitter', { failureRedirect: '/' }),
//   function(req, res) {
//     res.redirect('http://localhost:3000/home'); // make sure to change this before build
//   }
// );

app.get('/auth/github', passport.authenticate('github'));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    req.session.token = session.token;
    console.log(` this is whta you're looking for ========${session.token}`);
    res.redirect('http://localhost:3000/home');
  }
);

app.get('/', (req, res) => {
  res.send('ROOT ');
});

app.get('/github/data', (req, res) => {
  fetch(`https://api.github.com/user?access_token=${req.session.token}`)
    .then(r => r.json())
    .then(result => {
      res.send(result);
    });
});

app.get('/home', protectRoute, (req, res) => {
  res.send();
});

app.get('/preferences', (req, res) => {
  UserComp.getPref(req.session.user.id).then(array => {
    res.send(array);
  });
});

app.post('/preferences', (req, res) => {
  req.body.array.forEach(item => {
    UserComp.getPrefByName(item).then(object => {
      UserComp.addPref(req.session.user.id, object.id);
    });
  });
  req.body.delArray.forEach(item => {
    UserComp.getPrefByName(item).then(object => {
      UserComp.removePref(req.session.user.id, object.id);
    });
  });
  UserComp.getPref(req.session.user.id).then(array => {
    res.send(array);
  });
});

app.post('/login', (req, res) => {
  User.getByUsername(req.body.username).then(user => {
    let didMatch = user.checkPassword(req.body.password, user.password);
    if (didMatch) {
      req.session.user = user;
      console.log(req.session.user);

      res.redirect('/home');
    } else {
      res.redirect('/');
    }
  });
});

app.post('/register', (req, res) => {
  User.addUser(
    req.body.name,
    req.body.email,
    req.body.username,
    req.body.password
  ).then(user => {
    console.log(user);
    req.session.user = user;
    console.log(req.session.user);
    res.redirect('/home');
  });
});

app.post(`/logout`, (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get(`/home/settings`, (req, res) => {
  User.getById(req.session.user.id).then(result => res.send(result));
});

app.post(`/settings`, (req, res) => {
  User.getById(req.session.user.id).then(user => {
    user.updateName(req.body.name);
    user.updateEmail(req.body.email);
    user.updateUsername(req.body.username);
    res.redirect('/home/settings');
  });
});

// NOTES ROUTES
app.get('/:user_id/notes', (req, res) => {
  Note.getByUser(req.session.user.id).then(result => {
    res.send(result);
  });
});

app.post('/:user_id/notes', (req, res) => {
  Note.add(req.body.title, req.body.content, req.session.user.id).then(
    result => {
      res.send(result);
    }
  );
});

app.post('/:user_id/notes/:id', (req, res) => {
  Note.updateNote(req.params.id, req.body.title, req.body.content).then(
    result => {
      res.send(result);
    }
  );
});

app.delete('/:user_id/notes/:id', (req, res) => {
  Note.delete(req.params.id).then(result => {
    res.send(result);
  });
});

// TODOS ROUTES

app.get('/:user_id/todos', (req, res) => {
  Todo.getByUser(req.session.user.id).then(result => {
    res.send(result);
  });
});

app.post('/:user_id/todos', (req, res) => {
  Todo.add(req.body.content, req.session.user.id).then(result => {
    console.log(result);
    res.send(result);
  });
});

app.delete('/:user_id/todos/:id', (req, res) => {
  Todo.delete(req.params.id).then(result => {
    res.send(result);
  });
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});
