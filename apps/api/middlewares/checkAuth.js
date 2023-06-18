const authorize = (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, 'secret-key');
  
      req.userId = decoded.userId;
  
      next();
    } catch (error) {
      console.error('Error during authorization:', error);
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
  
  module.exports = authorize;