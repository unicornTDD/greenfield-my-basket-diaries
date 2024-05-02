/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("login", function (table) {
    table.increments("id").primary();
    table.string("display_name", 32);
    table.string("email").unique().notNullable();
    table.string("hashed_password").notNullable();
    table.string("salt").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("login");
};
