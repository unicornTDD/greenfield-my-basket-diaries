/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("diary").del();
  await knex("login").del();
  await knex("login").insert([
    {
      display_name: "Ter",
      email: "unicornsAreAwesomeTer@email.com",
      hashed_password: "5555555555",
      salt: "666",
    },
    {
      display_name: "Dominik",
      email: "unicornsAreAwesomeDom@email.com",
      hashed_password: "5555555555",
      salt: "666",
    },
    {
      display_name: "Deana",
      email: "unicornsAreAwesomeDna@email.com",
      hashed_password: "5555555555",
      salt: "666",
    },
  ]);
};
