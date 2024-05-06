/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("diary").del();
  await knex.raw('ALTER SEQUENCE diary_diary_id_seq RESTART WITH 1');
  await knex("diary").insert([
    {
      user_id: 1,
      date_created: "2024-04-30 07:37:16+09",
      food_title: "What does the Chicken say!",
      food_description: "CHICKEN!!!",
      image_url: "https://picsum.photos/200/300",
    }
      ]);
};
