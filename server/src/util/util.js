module.exports = {
  async auth(req, res, next) {
    if (req.session.authorized) {
      next();
    } else {
      res.status(401).send("You are not logged-in!");
    }
  },
};
