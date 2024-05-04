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
      food_title: "chicken",
      food_description: "CHICKEN!!!",
      image_url: "https://picsum.photos/200/300",
    },
    {
      user_id: 3,
      date_created: "2023-04-29 13:48:12+09",
      food_title: "turkey chicken",
      food_description: "christmas food in Easter",
      image_url: "https://picsum.photos/200/300",
    },
    {
      user_id: 2,
      date_created: "2024-05-02 06:13:16+09",
      food_title: "ice cream",
      food_description: "mint chocolate for life",
      image_url: "https://picsum.photos/200/300",
    },
    {
      user_id: 1,
      date_created: "2024-05-02 18:22:19+09",
      food_title: "duck",
    },
    {
      user_id: 3,
      date_created: "2024-05-01 19:01:53+09",
      food_title: "shoyu ramen",
      food_description: "too salty.",
      image_url: "https://picsum.photos/200/300",
    },
    {
      user_id: 2,
      date_created: "2024-05-01 18:30:29+09",
      food_title: "homemade pad thai",
      food_description: "better than any restaurant",
    },
    {
      user_id: 1,
      date_created: "2024-05-01 19:12:49+09",
      food_title: "spaghetti carbonara",
      image_url: "https://picsum.photos/200/300",
    },
    {
      user_id: 3,
      date_created: "2024-05-01 09:20:16+09",
      food_title: "tamago sando",
      food_description: "conbini breakfast",
      image_url: "https://picsum.photos/200/300",
    },
  ]);
};
