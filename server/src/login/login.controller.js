const util = require("../util/util");
const loginModel = require("./login.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  async createUser(req, res) {
    //get the entered password and email
    const email = req.body.email;
    const pw = req.body.password;

    //createHashedPW and insert into DB
    await bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(pw, salt, async function (err, hash) {
        await loginModel.createUser(email, hash, salt);
      });
    });

    // const createUser = await
    res.status(201).send();
  },

  async verifyUser(req, res) {
    //get the entered password and email
    const email = req.body.email;
    const pw = req.body.password;
    //verify
    const requestUser = await loginModel.retrievePW(email);
    const hash = requestUser[0]["hashed_password"];
    const userId = requestUser[0]["id"];

    //simple redirect logic, no pages are being locked right now
    bcrypt.compare(pw, hash, function (err, result) {
      if (result) {
        //for Authorization
        req.session.user = userId;
        req.session.authorized = true;
        res.redirect("/diaries");
      } else {
        res.status(401).send("Incorrect Password or Email, try again!");
      }
    });
  },
};
