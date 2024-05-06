/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("diary").del();
  await knex("login").del();
  await knex.raw("ALTER SEQUENCE login_id_seq RESTART WITH 1");
  await knex("login").insert([
    {
      display_name: "Ter",
      email: "unicornsAreAwesomeTer@email.com",
      hashed_password: "5555555555",
      salt: "666",
    },
  ]);
};
