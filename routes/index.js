const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const linkedinClientId = process.env.LINKEDIN_CLIENT_ID;
  res.render("index", { title: "Express", linkedinClientId });
});

module.exports = router;
