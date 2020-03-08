const express = require("express");
const router = express.Router();
const passport = require("passport");

// Google Login
router.get("/", passport.authenticate("google", {scope: ["profile", "email"]}));

router.get("/callbacknow", passport.authenticate("google"),
           (req,res) => {
               console.log("Inside the callbacknow");
               res.redirect("/admin/adminHome");
           }
);

// Get Current User
router.get("/getuser", (req, res) => {
    if (req.user) {
        response = {
            message: "getuser succesful",
            user: req.user,
            token: null
        };
        res.json(response);
    }
    else {
        response = {
            message: "Not Logged In",
            user: null,
            token: null
        };
        res.status(401).json(response);
    }
});

// Logout
router.get("/logout", (req, res) => {
    response = {
        message: "User logout succesful",
        user: null,
        token: null
    };
    req.logout();
    res.json(response);
});

module.exports = router;
