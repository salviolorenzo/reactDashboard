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

app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/home', (req, res) => {
  res.send();
});

app.get('/users', (req, res) => {
  User.getAll().then(userArray => {
    res.send(userArray);
  });
});

app.post('/login', (req, res) => {
  User.getByUsername(req.body.username).then(user => {
    let didMatch = user.checkPassword(req.body.password, user.password);
    if (didMatch) {
      res.redirect('/home');
    }
  });
});

// NOTES ROUTES
app.get('/notes', (req, res) => {
  Note.getAll().then(result => {
    res.send(result);
  });
});

app.post('/notes', (req, res) => {
  Note.add(req.body.title, req.body.content).then(result => {
    res.send(result);
  });
});

app.post('/notes/:id', (req, res) => {
  Note.updateNote(req.params.id, req.body.title, req.body.content).then(
    result => {
      res.send(result);
    }
  );
});

app.delete('/notes/:id', (req, res) => {
  Note.delete(req.params.id).then(result => {
    res.send(result);
  });
});

// TODOS ROUTES

app.get('/todos', (req, res) => {
  Todo.getByUser(1).then(result => {
    res.send(result);
  });
});

app.post('/todos', (req, res) => {
  Todo.add(req.body.content, req.body.user).then(result => {
    console.log(result);
    res.send(result);
  });
});

app.delete('/todos/:id', (req, res) => {
  Todo.delete(req.params.id).then(result => {
    res.send(result);
  });
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});
