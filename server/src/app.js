const express = require("express");
const session = require("express-session");
const util = require("./util/util");
const cors = require("cors");

const app = express();

//MIDLEWARE
app.use(cors());
app.use(express.json());
app.use(session({ secret: "Ter is never angry!" }));

//MVC CONTROLERS
const diaryController = require("./diary/diary.controller");
const loginController = require("./login/login.controller");

//LOGIN ENDPOINTS
app.post("/create_user", loginController.createUser);
app.post("/verify_user", loginController.verifyUser);

//DIARY ENDPOINTS
app.get("/diaries", diaryController.getAll);
app.get("/diaries/:userID", diaryController.getDiarybyUserID)
app.post("/diaries", diaryController.createDiary);
app.delete("/diaries/:id", auth, diaryController.deleteDiary);

//MIDDLEWARE FOR AUTHENTICATION
function auth(req, res, next) {
  if (req.session.authorized) {
    next();
  } else {
    res.status(401).send("You are not logged-in!");
  }
}

module.exports = app;
