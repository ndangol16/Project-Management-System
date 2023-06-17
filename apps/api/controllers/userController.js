
const User = require('../models/user')
app.post('/signup', async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body;
  
      // Check password and confirm password match
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
  
      // Check username 
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!usernameRegex.test(username)) {
        return res.status(400).json({ error: 'Invalid username format' });
      }
  
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
  
      // Username or email already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }]
      });
  
      if (existingUser) {
        return res.status(409).json({ error: 'Username or email already exists' });
      }
  
      // Password hashing
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();
  
      res.json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  });
  

app.post('/login', async (req, res) => {
try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Password check with hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
    }

    // JWT
    const token = jwt.sign({ userId: user._id }, 'secret-key');

    res.json({ token });
} catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
}
});
