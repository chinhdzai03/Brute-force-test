const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: { 
        type: Number, 
        unique: true 
    },
    username: { 
        type: String, 
        unique: true, 
        maxlength: 256 
    },
    password: { 
        type: String, 
        maxlength: 256 
    },
    hasPassword: { 
        type: String, 
        maxlength: 256 
    },
    loggedin: { 
        type: Number, 
        default: 0 
    },
    loggedAt: { 
        type: Date, 
        default: null 
    }
  });

  module.exports = mongoose.model('User', userSchema)