const db = require('./models/db');
const keys = require('./config');
const SpotifyStrategy = require('passport-spotify').Strategy;

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

// app.get('/', (req, res) => {
//   res.send('Home');
// });

app.get('/home', (req, res) => {
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
