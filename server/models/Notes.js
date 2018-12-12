const db = require('./db');

class Note {
  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
  }

  static add(title, content, user_id) {
    return db
      .any(
        `insert into notes
      (title, content, user_id)
      values
      ($1,$2,$3)`,
        [title, content, user_id]
      )
      .then(result => {
        return new Note(result.id, title, content, user_id);
      });
  }

  static getAll() {
    return db.any(`select * from notes`);
  }

  static getById(id) {
    return db.one(`select * from notes where id=$1`, [id]);
  }

  static getByUser(user_id) {
    return db.any(`select * from notes where user_id = $1`, [user_id]);
  }

  static updateNote(id, newNote) {
    return db.result(`update notes set content=$2 where id=$1`, [id, newNote]);
  }

  static delete(id) {
    return db.result(`delete * from notes where id=$1`, [id]);
  }
}

module.exports = Note;
