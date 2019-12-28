const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  emailid: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserById = function(id, callback) {
  User.getUserById(id, callback);
};

module.exports.getUserByUserName = function(username, callback) {
  var query = { username: username };
  User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function(
  inputPassword,
  systemPassword,
  callback
) {
  bcrypt.compare(inputPassword, systemPassword, (err, isMatch) => {
    console.log("  " + inputPassword + "    " + systemPassword);
    if (err) throw err;
    callback(null, isMatch);
  });
};
