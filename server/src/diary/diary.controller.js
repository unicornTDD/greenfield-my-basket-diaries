const diaryModel = require("./diary.model");

module.exports = {
  async getAll(req, res) {
    const diaries = await diaryModel.getAll();
    res.status(200).send(diaries);
  },

  async getDiarybyUserID(req, res) {
    const userID = req.params.userID;
    const userDiaries = await diaryModel.getDiarybyUserID(userID);
    res.status(200).send(userDiaries);
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
