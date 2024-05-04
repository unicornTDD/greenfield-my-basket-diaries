const knex = require("../knex");
const DIARY_TABLE = "diary";

module.exports = {
  getAll() {
    return knex.select("*").from(DIARY_TABLE);
  },

  createDiary(userID, foodTitle, foodDescription, imageURL) {
    return knex
      .insert({
        user_id: userID,
        date_created: new Date(),
        food_title: foodTitle,
        food_description: foodDescription,
        image_url: imageURL,
      })
      .into(DIARY_TABLE);
  },

  deleteDiary(deletedId) {
    return knex("diary").where("diary_id", deletedId).del();
  },
};
