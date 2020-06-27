const db = require('../db');
const validators = require('../validators');

class User {
  constructor(email, password, phone_number) {
    this.email = email.toLowerCase();
    this.password = password;
    this.phone_number = validators.formatPhoneNumber(phone_number);
  }

  get user() {
    return {
      email: this.email,
      password: this.password,
      phone_number: this.phone_number,
    }
  }

  set user(newUser) {
    this.email = newUser.email;
    this.password = newUser.password;
    this.phone_number = newUser.phone_number; 
  }

  save() {
    if(this.user.email.trim() === "") {
      throw 'email is required';
    }
    if(this.user.password.trim() === "") {
      throw 'password is required';
    }
    if(this.user.phone_number === null) {
      throw 'phone number is required';
    }
    try {
      db.writeUser({
        ...this.user,
        created: Date.now()
      });
    } catch (error) {
      throw error;
    }
  }
};

module.exports = User