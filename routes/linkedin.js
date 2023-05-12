const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/callback", function (req, res, next) {
  res.render("callback");
});

module.exports = router;
