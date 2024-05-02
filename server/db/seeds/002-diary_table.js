/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("diary").del();
  await knex("diary").insert([
    {
      user_id: 1,
      date_created: "2024-02-25",
      food_title: "chicken",
      food_description: "CHICKEN!!!",
      image_url: "https://picsum.photos/200/300",
    },
    {
      user_id: 3,
      date_created: "2024-12-24",
      food_title: "turkey chicken",
      food_description: "christmas food in Easter",
      image_url: "https://picsum.photos/200/300",
    },
    {
      user_id: 2,
      date_created: "2024-03-02",
      food_title: "ice cream",
      food_description: "mint chocolate for life",
      image_url: "https://picsum.photos/200/300",
    },
    {
      user_id: 1,
      date_created: "2024-05-02",
      food_title: "duck",
    },
  ]);
};
