require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();
app.set("trust proxy", 1);

//MIDLEWARE
app.use(
  cors({
    origin: process.env.FE_PATH, //add to RENDER as ENV  VARIABLE
    credentials: true,
  })
);
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SECRET, process.env.FIRE_BASE], 
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
    httpOnly: false,
    sameSite: "none",
  })
);

//MVC CONTROLERS
const diaryController = require("./diary/diary.controller");
const loginController = require("./login/login.controller");

//LOGIN ENDPOINTS
app.post("/create_user", loginController.createUser);
app.post("/verify_user", loginController.verifyUser);

//DIARY ENDPOINTS
app.get("/diaries", auth, diaryController.getAll);
app.get("/diaries/:userID", auth, diaryController.getDiarybyUserID);
app.post("/diaries", auth, diaryController.createDiary);
app.patch("/diaries/:id", auth, diaryController.editDiary);
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
