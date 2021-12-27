const mongoose = require("mongoose");
const validator = require("validator");

const passwordPattern = /^[a-zA-Z\d@-]{8,20}$/;
const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
    validate(value) {
      if (!passwordPattern.test(value)) {
        throw new Error("Password is not valid");
      }
    },
  },
});

module.exports = User;
