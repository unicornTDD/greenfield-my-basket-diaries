const knex = require("../knex");
const LOGIN_TABLE = "login";

module.exports = {
  createUser(email, hash, salt) {
    return knex(LOGIN_TABLE).insert({
      email: email,
      hashed_password: hash,
      salt: salt,
    });
  },
};
