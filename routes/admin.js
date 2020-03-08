const express = require("express");
const router = express.Router();
const passport = require("passport");
const requireLogin = require("../auth/requireLogin");

// /admin

// Get Current User
router.get("/adminHome",  requireLogin, (req, res) => {
    res.send("In Admin Home Page");
});

module.exports = router;
