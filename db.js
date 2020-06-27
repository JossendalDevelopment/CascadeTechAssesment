const db = {
  users: [],
  events: []
};

const writeUser = (data) => {
  if(db.users.filter(user => {
    return user.email === data.email.trim()
  }).length > 0) {
    throw 'User already exists'
  } else {
    db.users.push(data)
  }
};

const writeEvent = (data) => {
  db.events.push(data);
};

const readFromTable = (table) => {
  return db[table];
};

module.exports = {
  writeUser,
  writeEvent,
  readFromTable,
};