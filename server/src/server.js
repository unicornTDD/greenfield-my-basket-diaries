const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

const diaryController = require("./diary/diary.controller");

//diary GET endpoints
//gets all data from the diary table
app.get("/diaries", diaryController.getAll);

app.listen(PORT, () => {
  console.log(`I am now waiting for incoming HTTP traffic on port ${PORT}!`);
});
