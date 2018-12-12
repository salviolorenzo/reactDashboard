const db = require('./db');

class Todo {
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }

  static add(content, user_id) {
    db.any(
      `insert into todos
    (content, user_id)
    values
    ($1, $2)`,
      [content, user_id]
    ).then(result => {
      return new Todo(result.id, content, user_id);
    });
  }

  static getByUser(user_id) {
    return db.any(
      `
      select * from todos where user_id = $1
    `,
      [user_id]
    );
  }

  static getById(id) {
    return db.one(`select * from todos where id =$1`, [id]);
  }

  static delete(id) {
    return db.result(`delete * from todos where id=$1`, [id]);
  }
}

module.exports = Todo;
