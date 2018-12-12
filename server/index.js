const db = require('./models/db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const User = require('./models/User');
const Todo = require('./models/Todo');
const Note = require('./models/Notes');

app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/users', (req, res) => {
  User.getAll().then(userArray => {
    res.send(userArray);
  });
});

app.get('/notes', (req, res) => {
  Note.getAll().then(result => {
    res.send(result);
  });
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});
