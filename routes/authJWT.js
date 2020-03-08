const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const {insertDB,findByColumn} = require("../IN_MEMORY_DB");
const keys = require("../config/keys");
const {check, validationResult} = require("express-validator");

router.post("/register",
            [
                check("username", "Please include a valid username")
                    .not().isEmpty(),
                check("password", "Please enter a password with 6 or more characters")
                    .isLength({min: 3})
            ],

            async (req,res) => {
                let response = {
                    message: null,
                    user: null,
                    token: null
                };
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    response = {
                        message : {errors: errors.array()},
                        user: null,
                        token: null
                    };
                    return res.status(401).json(response);
                }
                const {name,username, password} = req.body;
                try {
                    let user = findByColumn("USER_TABLE","username",username);
                    if (user !== undefined) {
                        response = {
                            message : "User Already Exists",
                            user,
                            token: null
                        };
                        res.status(401).json(response);
                    }
                    else {
                        let user = {
                            name,
                            username,
                            password
                        };
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(password, salt);
                        user = insertDB("USER_TABLE",{...user, name});

                        const payload = {
                            user: {
                                id: user.id,
                                username: user.username,
                                name: user.name
                            }
                        };
                        jwt.sign(payload, keys.jwtSecret, {expiresIn: 360000}, (err, token) => {
                            if (err) {
                                response = {
                                    message : err.message,
                                    user: null,
                                    token: null
                                };
                                return res.status(401).json(response);
                            }
                            response = {
                                message: "User register succesful",
                                user: {id: user.id, username: user.username, name:name},
                                token
                            };
                            res.json(response);
                        });
                    }
                } catch (err) {
                    response = {
                        message : err.message,
                        user: null,
                        token: null
                    };
                    res.status(401).json(response);
                }
            });

router.post("/login",
            [
                check("username", "Please include a valid username")
                    .not().isEmpty(),
                check("password", "Please enter a password with 6 or more characters")
                    .isLength({min: 3})
            ],
            async (req,res) => {
                let response = {
                    message: null,
                    user: null,
                    token: null
                };
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    response = {
                        message : {errors: errors.array()},
                        user: null,
                        token: null
                    };
                    return res.status(401).json(response);
                }

                const {username, password} = req.body;

                try {
                    let user = findByColumn("USER_TABLE","username",username);

                    if (user === undefined) {
                        response = {
                            message : "Invalid Credentials",
                            user,
                            token: null
                        };
                        return res.status(401).json(response);
                    }

                    const isMatch = await bcrypt.compare(password, user.password);

                    if (!isMatch) {
                        response = {
                            message : "Invalid Credentials",
                            user,
                            token: null
                        };
                        return res.status(401).json(response);
                    }

                    const payload = {
                        user: {
                            id: user.id,
                            username: user.username,
                            name: user.name
                        }
                    };

                    jwt.sign(payload, keys.jwtSecret, {expiresIn: 360000}, (err, token) => {
                        console.log("jwtSign");

                        if (err) {
                            response = {
                                message : err.message,
                                user: null,
                                token: null
                            };
                            return res.status(401).json(response);
                        }
                        response = {
                            message: "User login succesful",
                            user: {id: user.id, username: user.username, name:user.name},
                            token
                        };

                        res.json(response);
                    } )

                } catch (err) {
                    response = {
                        message : err.message,
                        user: null,
                        token: null
                    };
                    res.status(401).json(response);
                }
            });

module.exports = router;
