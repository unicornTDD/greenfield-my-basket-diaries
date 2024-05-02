const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

const diaryController = require("./diary/diary.controller");
const loginController = require("./login/login.controller");

//DIARY GET ENDPOINTS
app.get("/diaries", diaryController.getAll);

//DIARY DELETE endpoint
app.delete("/diaries/:id", diaryController.deleteDiary);

//LOGIN ENDPOINTS
app.post("/create_user", loginController.createUser);
app.post("/verify_user", loginController.verifyUser);

app.listen(PORT, () => {
  console.log(`I am now waiting for incoming HTTP traffic on port ${PORT}!`);
});
