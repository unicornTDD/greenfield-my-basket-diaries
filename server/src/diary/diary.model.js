const knex = require("../knex");
const DIARY_TABLE = "diary";

module.exports = {
  getAll() {
    return knex.select("*").from(DIARY_TABLE);
  },
};
