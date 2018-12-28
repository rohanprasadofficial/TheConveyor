const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Person = require("./../../models/Person");
const Profile = require("../../models/Profile");
//Profile Route

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          res.status(404).json({ message: "User profile not found" });
        } else {
          return res.json(profile);
        }
      })
      .catch(err => console.log(err));
  }
);

//route for updating personal use profile
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileValues = {};
    profileValues.user = req.user.id;
    if (req.body.username) profileValues.username = req.body.username;
    if (req.body.website) profileValues.website = req.body.website;
    if (req.body.country) profileValues.country = req.body.country;
    if (req.body.portfolio) profileValues.portfolio = req.body.portfolio;
    if (typeof req.body.languages != undefined) {
      profileValues.languages = req.body.languages.split(",");
    }

    profileValues.social = {};
    if (req.body.facebook) profileValues.social.facebook = req.body.facebook;
    if (req.body.twitter) profileValues.social.twitter = req.body.twitter;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileValues },
            { new: true }
          )
            .then(profile => res.send(profile))
            .catch(err => {
              console.log("Database error" + err);
            });
        } else {
          Profile.findOne({ username: profileValues.username })
            .then(profile => {
              if (profile) {
                res.json({ message: "Username already exists " });
              } else {
                var newProfile = new Profile(profileValues);
                newProfile
                  .save()
                  .then(profile => {
                    res.json(profile);
                  })
                  .catch(err => {
                    console.log("DB error");
                  });
              }
            })
            .catch(err => console.log("DB Error"));
        }
      })
      .catch(err => console.log("Error in fetching DB Details"));
  }
);

module.exports = router;
