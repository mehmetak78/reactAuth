const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./routes/passportStrategies");
const keys = require("./config/keys");

const app = express();
app.use(express.json({extended:false}));
app.get("/",(req,res) => {
    res.json({msg:"React Auth Sample"});
});

app.use(
    cookieSession({
                      maxAge: 30 * 24 * 60 * 60 * 1000,  //30 days
                      keys: [keys.cookieKey]
                  })
);
app.use(passport.initialize());
app.use(passport.session());

// Define Routes
//app.use("/auth/passportjwt", require("./routes/authPassportJWT"));
//app.use("/auth/passportlocal", require("./routes/authPassportLocal"));
//app.use("/auth/google", require("./routes/authPassportGoogle"));
app.use("/authpassport", require("./routes/authPassport"));
app.use("/admin", require("./routes/admin"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));
