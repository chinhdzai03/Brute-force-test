const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('./model/user.model');
const rateLimit = require('express-rate-limit');

const uri = 'mongodb+srv://chinhwebapp:6AI2lRbwnT4CHjdI@cluster0.enu2bxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(uri, { dbName: 'test-user' });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB Cloud connection established successfully");
})

// Tao bo loc gioi han toc do
const loginLimiter = rateLimit({
  windowMs: 1000, 
  max: 5, 
  handler: (req, res) => {
    return res.status(429).json({ result: 'failed', message: '.......' });
  }
});

app.post('/login', loginLimiter ,async (req, res) => {
  const { username, password } = req.body;
  
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  const user = await User.findOne({ username: username, hasPassword: hashedPassword });

  if (user) {
    user.loggedin = 1;
    user.loggedAt = new Date();
    await user.save();
    res.json({ result: 'success', userId: user.userId });
  } else {
    res.json({ result: 'failed' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
