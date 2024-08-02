const User = require('./model/user.model');
const crypto = require('crypto');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://chinhwebapp:6AI2lRbwnT4CHjdI@cluster0.enu2bxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(uri, { dbName: 'test-user' });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB Cloud connection established successfully");
})
async function initDB() {
  
    await User.deleteMany({});
  
    const users = [];
    for (let i = 0; i < 1000000; i++) {
      const username = [...Array(6)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const password = [...Array(6)].map(() => Math.floor(Math.random() * 10)).join('');
      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
      users.push({
        userId: i + 1,
        username: username,
        password : password,
        hasPassword: hashedPassword,
        loggedin: 0,
        loggedAt: null
      });
    }
    await User.insertMany(users);
  }
  
  initDB();