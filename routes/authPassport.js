const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');
const {insertDB,} = require("../IN_MEMORY_DB");
const keys = require("../config/keys");

// Google
router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));

router.get("/google/callback", passport.authenticate("google"),
           (req,res) => {
               console.log("Inside the callback");
               res.redirect("/admin/adminHome");
           }
);

// Local

router.post('/local/register',(req,res, next) => {
    const name = req.body.name;
    let response = {
        message: null,
        user: null,
        token: null
    };

    passport.authenticate('register', { session : false}, (error, user) => {
        if (error) {
            response = {
                message : error.message,
                user: null,
                token: null
            };
            res.status(401).json(response);
        }
        else {
            req.login(user, { session : true }, async (error) => {
                if (error) {
                    response = {
                        message : error.message,
                        user: null,
                        token: null
                    };
                    res.status(401).json(response)
                }
                else {
                    user = insertDB("USER_TABLE",{...user, name});
                    response = {
                        message: "User register succesful",
                        user: {id: user.id, username: user.username, name:name},
                        token:null
                    };
                    res.json(response);
                    //console.log(findByColumn("USER_TABLE","username",user.username));
                }
            });
        }

    })(req,res,next);

});

router.post('/local/login',(req,res, next) => {

    let response = {
        message: null,
        user: null,
        token: null
    };

    passport.authenticate('login', { session : false}, (error, user) => {
        if (error) {
            response = {
                message : error.message,
                user: null,
                token: null
            };
            res.status(401).json(response);
        }
        else {
            req.login(user, { session : true }, async (error) => {
                if (error) {
                    response = {
                        message : error.message,
                        user: null,
                        token: null
                    };
                    res.status(401).json(response);
                }
                else {
                    response = {
                        message: "User login succesful",
                        user: {id: user.id, username: user.username, name: user.name},
                        token:null
                    };
                    res.json(response);
                }
            });
        }

    })(req,res,next);

});

// JWT

router.post('/jwt/register',(req,res, next) => {
    const name = req.body.name;
    let response = {
        message: null,
        user: null,
        token: null
    };

    passport.authenticate('register', { session : false}, (error, user) => {
        if (error) {
            response = {
                message : error.message,
                user: null,
                token: null
            };
            res.status(401).json(response);
        }
        else {
            req.login(user, { session : false }, async (error) => {
                if (error) {
                    response = {
                        message : error.message,
                        user: null,
                        token: null
                    };
                    res.status(401).json(response)
                }
                else {
                    const body = {id: user.id, username: user.username, name: user.name};
                    const token = jwt.sign({user: body}, keys.jwtSecret);
                    user = insertDB("USER_TABLE",{...user, name});
                    response = {
                        message: "User register succesful",
                        user: {id: user.id, username: user.username, name:name},
                        token
                    };
                    res.json(response);
                    //console.log(findByColumn("USER_TABLE","username",user.username));
                }
            });
        }

    })(req,res,next);

});

router.post('/jwt/login',(req,res, next) => {

    let response = {
        message: null,
        user: null,
        token: null
    };

    passport.authenticate('login', { session : false}, (error, user) => {
        if (error) {
            response = {
                message : error.message,
                user: null,
                token: null
            };
            res.status(401).json(response);
        }
        else {
            req.login(user, { session : false }, async (error) => {
                if (error) {
                    response = {
                        message : error.message,
                        user: null,
                        token: null
                    };
                    res.status(401).json(response);
                }
                else {
                    const body = {id: user.id, username: user.username, name: user.name};
                    const token = jwt.sign({user: body}, keys.jwtSecret);
                    response = {
                        message: "User login succesful",
                        user: {id: user.id, username: user.username, name: user.name},
                        token
                    };
                    res.json(response);
                }
            });
        }

    })(req,res,next);

});



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
