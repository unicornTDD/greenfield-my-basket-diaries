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
};
