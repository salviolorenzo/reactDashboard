const db = require('./db');

class UserComponents {
  constructor(id) {
    this.id = id;
  }

  static getPrefByName(name) {
    return db.one(`select id from preferences where name=$1`, [name]);
  }

  static addPref(user_id, pref_id) {
    return db.one(
      `insert into user_preferences
      (user_id, pref_id)
      values
      ($1, $2)
        
    `,
      [user_id, pref_id]
    );
  }

  static getPref(user_id) {
    return db.any(
      `select * from preferences where id in
        (select pref_id from user_preferences where user_id=$1)
    `,
      [user_id]
    );
  }

  static removePref(user_id, pref_id) {
    return db.result(
      `delete from user_preferences where user_id=$1 AND pref_id=$2`,
      [user_id, pref_id]
    );
  }
}

module.exports = UserComponents;
