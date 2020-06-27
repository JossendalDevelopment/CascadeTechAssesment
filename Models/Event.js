const db = require('../db');

class Event {
  constructor(type, identifier) {
    this.type = type;
    this.identifier = identifier;
  }

  save() {
    db.writeEvent({
      type: this.type,
      identifier: this.identifier,
      created: Date.now()
    })
  }
}

module.exports = Event;