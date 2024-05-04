const diaryModel = require("./diary.model");

module.exports = {
  async getAll(req, res) {
    const diaries = await diaryModel.getAll();
    res.status(200).send(diaries);
  },

  async createDiary(req, res) {
    const { userID, foodTitle, foodDescription, imageURL } = req.body;
    await diaryModel.createDiary(userID, foodTitle, foodDescription, imageURL);
    res.status(200).send("New diary entry created!");
  },

  async editDiary(req, res) {
    const diaryID = req.params.id;
    const { foodTitle, foodDescription, imageURL } = req.body;
    await diaryModel.editDiary(diaryID, foodTitle, foodDescription, imageURL);
    res.status(200).send("Diary entry updated!");
  },

  async deleteDiary(req, res) {
    const deletedId = req.params.id;
    await diaryModel.deleteDiary(deletedId);
    res.status(200).send("Diary entry deleted!");
  },
};
