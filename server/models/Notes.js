const db = require('./db');

class Note {
  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
  }

  static getAll() {
    return db.any(`select * from notes`);
  }
}

module.exports = Note;
