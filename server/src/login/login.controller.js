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
