const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "myPerson"
  },
  QuestionPart: {
    type: String,
    required: true
  },
  CodePart: {
    type: String
  },
  name: {
    type: String
  },

  upvotes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "myPerson"
      }
    }
  ],

  answer: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "myPerson"
      }
    },
    {
      text: {
        type: String,
        required: true
      }
    },
    {
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Question = mongoose.model("MyQuestion", QuestionSchema);
