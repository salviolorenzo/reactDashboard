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
