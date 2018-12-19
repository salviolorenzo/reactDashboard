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
      `select p.name from
      user_preferences u
      inner join preferences p 
      on u.pref_id = p.id
      where u.user_id=$1
      order by u.index asc
    `,
      [user_id]
    );
  }
  static updateOrder(newIndex, user_id, pref_id) {
    return db.result(
      `update user_preferences 
      set index=$1 
      where user_id=$2
      AND
      pref_id=$3`,
      [newIndex, user_id, pref_id]
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
