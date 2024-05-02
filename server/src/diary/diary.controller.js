const diaryModel = require("./diary.model");

module.exports = {
  async getAll(req, res) {
    const diaries = await diaryModel.getAll();
    res.status(200).send(diaries);
  },

  async deleteDiary(req, res) {
    const deletedId = req.params.id;
    await diaryModel.deleteDiary(deletedId);
    res.status(200).send();
  },
};
