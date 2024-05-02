const diaryModel = require("./diary.model");

module.exports = {
  async getAll(req, res) {
    const diary = await diaryModel.getAll();
    res.status(200).send(diary);
  },
};
