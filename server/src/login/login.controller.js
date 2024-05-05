const loginModel = require("./login.model");
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  async createUser(req, res) {
    const { email, password } = req.body;
    const existingUser = await loginModel.findOne(email);

    //validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid Email Format" });
    }
    if (existingUser.length > 0) {
      return res.status(409).json({ error: "Email already exists" });
    }

    //create user
    try {
      //create USER
      await bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          await loginModel.createUser(email, hash, salt);
        });

        // const createUser = await
        res.status(201).json({ message: "Account created!" });
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async verifyUser(req, res) {
    const { email, password } = req.body;
    let dbPassword = "";
    let hash = "";
    let user = "";

    //validate if email format is correct
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid Email Format" });
    } else {
      //retrive password
      dbPassword = await loginModel.retrievePassword(email);
      if (dbPassword.length > 0) {
        hash = dbPassword[0]["hashed_password"];
        user = dbPassword[0]["id"];
      }
    }

    //check if valid PW
    try {
      bcrypt.compare(password, hash, function (err, result) {
        if (result) {
          //set session tokens!
          req.session.user = user;
          req.session.authorized = true;
          res.status(200).send({ message: "Login succesfull!", user: user });
        } else {
          res.status(401).send("Incorrect Password or Email, try again!");
        }
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
