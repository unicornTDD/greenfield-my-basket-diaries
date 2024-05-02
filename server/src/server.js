const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(session({ secret: "Ter is never angry!" }));

//MVC CONTROLERS
const diaryController = require("./diary/diary.controller");
const loginController = require("./login/login.controller");

//DIARY GET ENDPOINTS
app.get("/diaries", auth, diaryController.getAll);
//DIARY DELETE endpoint
app.delete("/diaries/:id", auth, diaryController.deleteDiary);

//LOGIN ENDPOINTS
app.post("/create_user", loginController.createUser);
app.post("/verify_user", loginController.verifyUser);

//BOUNCER
function auth(req, res, next) {
  if (req.session.authorized) {
    next();
  } else {
    res.status(401).send("You are not logged-in!");
  }
}

app.listen(PORT, () => {
  console.log(`I am now waiting for incoming HTTP traffic on port ${PORT}!`);
});
