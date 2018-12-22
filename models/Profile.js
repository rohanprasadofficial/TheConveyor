const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var Profile = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "myPerson"
  },

  username: {
    type: String,
    required: false
  },

  website: {
    type: String
  },

  country: {
    type: String
  },

  languages: {
    type: [String],
    required: true
  },

  portfolio: {
    type: String
  },
  bio: {
    type: String,
    maxlength: 60
  },
  social: {
    facebook: {
      type: String
    },
    twitter: {
      type: String
    }
  }
});

module.exports = Profile = mongoose.model("myProfile", Profile);
