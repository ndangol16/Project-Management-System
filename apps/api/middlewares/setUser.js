const User = require("../models/user");

const setUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Setting the user
      req.user = user;
  
      next();
    } catch (error) {
      console.error('Error setting user:', error);
      res.status(400).json({ error: 'user set error' });
    }
  };
  

  module.exports = setUser;