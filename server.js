const express = require("express");

//const cookieSession = require("cookie-session");

const keys = require("./config/keys");
const requireLogin = require("./authMiddlewares/requireLogin");
let passport;

if (keys.authPassportJWT || keys.authPassportSession) {
    passport = require("passport");
    require("./authMiddlewares/passportStrategies");
}

const app = express();
app.use(express.json({extended:false}));
app.get("/",(req,res) => {
    res.json({msg:"React Auth Sample"});
});

/*app.use(
    cookieSession({
                      maxAge: 30 * 24 * 60 * 60 * 1000,  //30 days
                      keys: [keys.cookieKey]
                  })
);*/


// Define Routes

if (keys.authPassportJWT || keys.authPassportSession) {
    app.use(passport.initialize());
    app.use(passport.session());
    app.use("/authpassport", require("./routes/authPassport"));
}
if (keys.jwtSecret) {
    app.use("/authjwt", require("./routes/authJWT"));
}
app.use("/admin", requireLogin, require("./routes/admin"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));
