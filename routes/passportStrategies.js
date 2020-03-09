const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");

const { findByColumn, insertDB} = require("../IN_MEMORY_DB");

passport.serializeUser((user, done) => {
    if (user.id) {
        done(null, user.id);
    }
    else {
        done(null, user);
    }
});

passport.deserializeUser((id, done) => {
    const user = findByColumn("USER_TABLE","id",id);
    if (user) {
        done(null, user);
    }
    else {
        done(null,null);
    }
});

// GOOGLE STRATEGY

passport.use(new GoogleStrategy({
                                    clientID: keys.googleClientID,
                                    clientSecret: keys.googleClientSecret,
                                    callbackURL: "/authpassport/google/callback",
                                    proxy:true
                                },
                                (accesToken, refreshToken, profile, done) => {
                                    let user = findByColumn("USER_TABLE","googleId",profile.id);
                                    if (user !== undefined) {
                                        return done(null, user);
                                    }
                                    user = {
                                        googleId:profile.id,
                                        name:profile.displayName
                                    };

                                    user = insertDB("USER_TABLE",user);
                                    done(null, user);
                                }
));


// LOCAL STRATEGY

passport.use('register', new LocalStrategy(
    async (username, password, done)=> {
        try {
            const user = findByColumn("USER_TABLE","username",username);
            if (user !== undefined) {
                const error = new Error("User Already Exists");
                return done(error, null );
            }
            else {
                let user = {
                    username,
                    password
                };
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
                return done(null, user);
            }
        } catch (error) {
            return done(error, null);
        }
    }));

passport.use('login', new LocalStrategy(
    async (username, password, done)=> {
        try {
            const user = findByColumn("USER_TABLE","username",username);
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    const error = new Error("Invalid Password");
                    return done(error, null );
                }
                return done(null, user);
            }
            else {
                const error = new Error("User Not Found");
                return done(error, null );
            }
        } catch (error) {
            return done(error, null);
        }
    }));

// JWT STRATEGY

passport.use( new JWTstrategy({
                                 secretOrKey : keys.jwtSecret,
                                 jwtFromRequest : ExtractJWT.fromHeader(keys.tokenName)
                             }, async (token, done) => {
    try {
        console.log("passport.use");
        console.log(token);
        console.log(token.user);

        return done(null, token.user);
    } catch (error) {
        done(error, null);
    }
}));
