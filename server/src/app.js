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

//DIARY GET ENDPOINTS
app.get("/diaries", util.auth, diaryController.getAll);
//DIARY DELETE endpoint
app.delete("/diaries/:id", util.auth, diaryController.deleteDiary);

module.exports = app;
