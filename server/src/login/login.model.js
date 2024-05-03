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

  //login verification
  retrievePW(email) {
    return knex(LOGIN_TABLE)
      .select("hashed_password", "id")
      .where("email", email);
  },
  findOne(email) {
    return knex(LOGIN_TABLE).select("email").where("email", email);
  },
};
