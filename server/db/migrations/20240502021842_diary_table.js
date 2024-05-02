/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("diary", function (table) {
    table.increments("diary_id").primary();
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("id").inTable("login");
    table.dateTime("date_created").notNullable();
    table.string("food_title").notNullable();
    table.string("food_description", 1000);
    table.string("image_url", 1000);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("diary");
};
