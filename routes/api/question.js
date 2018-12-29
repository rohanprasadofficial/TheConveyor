const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Person = require("./../../models/Person");
const Profile = require("../../models/Profile");
const Question = require("../../models/Question");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newQuestion = new Question({
      QuestionPart: req.body.questionpart,
      CodePart: req.body.codepart,
      name: req.body.name
    });

    newQuestion
      .save()
      .then(question => res.json(question))
      .catch(err => {
        console.log("Unable to push question");
      });
  }
);

router.get("/", (req, res) => {
  Question.find()
    .sort({ date: -1 })
    .then(questions => {
      if (questions) {
        res.json(questions);
      } else {
        res.json({ message: "No question exist" });
      }
    })

    .catch(err => console.log("Queston fetching error"));
});

module.exports = router;
