const passport = require("passport");

module.exports = (req, res, next) => {
    if (req.user) {
        console.log("req.user");
        return next();
    }

    passport.authenticate('jwt', {session: false}, (error, user) => {
        if (error  || !user) {
            const response = {
                message: error ? error.message : "You must login",
                user: null,
                token: null
            };
            return res.status(401).json(response)
        }
        else {
            return next();
        }
    })(req, res, next);
};
