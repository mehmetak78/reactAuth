const express = require("express");
const router = express.Router();

router.get("/adminHome",  (req, res) => {
    res.send("In Admin Home Page");
});

module.exports = router;
