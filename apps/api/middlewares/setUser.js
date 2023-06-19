const User = require("../models/user");
const jwt = require("jsonwebtoken");

const setUser = async (req, res, next) => {

    try {
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        const token = req.headers.authorization.split(" ")[1];

        const {userId} = jwt.verify(token, "secret-key");

        const user = await User.findById(userId);

        req.user = user;

      }
      next();
    } catch (error) {
      console.error('Error setting user:', error);
      res.status(400).json({ error: 'user set error' });
    }
  };
  

  module.exports = setUser;