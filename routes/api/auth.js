const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

const Person = require("./../../models/Person");

router.get("/", (req, res) => {
  res.json({ sucess: true });
});

router.post("/register", (req, res) => {
  Person.findOne({ email: req.body.email })
    .then()
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
