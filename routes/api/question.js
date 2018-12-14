const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ sucess: true });
});

module.exports = router;
