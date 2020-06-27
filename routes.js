const db = require('./db');
const User = require('./Models/User');
const Event = require('./Models/Event');

const getUsers = (res) => {
  const users = db.readFromTable('users');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200);
  res.write(JSON.stringify(users));
  res.end();
};

const createUser = (res, body) => {
  try {
    const user = new User(body.email, body.password, body.phone)
    user.save();
    // log attempted creation event
    const event = new Event('LOGIN', body.email);
    event.save();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200)
    res.end('Success');
  } catch (error) {
    const event = new Event('FAILED', body.email);
    event.save();
    res.writeHead(500);
    res.write(JSON.stringify({message: error}));
    res.end();
  }
};

const getEvents = (res) => {
  const events = db.readFromTable('events');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200);
  res.write(JSON.stringify(events));
  res.end();
};

const getEventsById = (res, id) => {
  const events = db.readFromTable('events').filter(evt => evt.identifier === id);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200);
  res.write(JSON.stringify(events));
  res.end();
};

const getEventsByType = (res, type) => {
  const events = db.readFromTable('events').filter(evt => evt.type === type);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200);
  res.write(JSON.stringify(events));
  res.end();
};

const getEventsDayBeforeLast = (res) => {
  const now = Date.now();
  // 86400 is seconds in a day
  const events = db.readFromTable('events').filter(evt => {
    return now - evt.created > 86400 && now - evt.created < 172800;
  });
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200);
  res.write(JSON.stringify(events));
  res.end();
};

const getEventsLastWeek = (res, weeks = 1) => {
  try {
    if(isNaN(weeks)) {
      throw 'weeks parameter is not a number'
    }
    const now = Date.now();
    // 604800 is seconds in a week
    const seconds = weeks * 604800
    const events = db.readFromTable('events').filter(evt => {
      return (evt.created < now && evt.created > now - seconds) && evt.type !== 'SESSION_TIMEOUT';
    });
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);
    res.write(JSON.stringify(events));
    res.end();
  } catch (error) {
    res.writeHead(500);
    res.write(JSON.stringify({message: 'weeks parameter is not a number'}));
    res.end();
  }
};

const createEvent = (res, body) => {
  try {
    const event = new Event(body.type)
    event.save();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200)
    res.end('Success');
  } catch (error) {
    res.writeHead(500);
    res.write(JSON.stringify({message: error}));
    res.end();
  }
};

const notFound = (res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(404);
  res.write(JSON.stringify({message: "File not found"}));
  res.end();
};

module.exports = {
  getUsers,
  createUser,
  getEvents,
  getEventsById,
  getEventsByType,
  getEventsDayBeforeLast,
  getEventsLastWeek,
  createEvent,
  notFound
}