const diaryModel = require("./diary.model");

module.exports = {
  async getAll(req, res) {
    const diaries = await diaryModel.getAll();
    res.status(200).send(diaries);
  },

  async createDiary(req, res) {
    const { userID, foodTitle, foodDescription, imageURL } = req.body;
    const newDiary = await diaryModel.createDiary(
      userID,
      foodTitle,
      foodDescription,
      imageURL
    );
    res.status(200).send("new diary entry created!");
  },

  async deleteDiary(req, res) {
    const deletedId = req.params.id;
    await diaryModel.deleteDiary(deletedId);
    res.status(200).send();
  },
};
