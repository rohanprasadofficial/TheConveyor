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
        }

        return res.json(profile);
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
