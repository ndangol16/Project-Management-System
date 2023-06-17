const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Failed to connect to MongoDB:', err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    columns: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Column',
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;