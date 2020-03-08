To Run Server
    $ npm run server

To Run Client
    $ npm run client

To Run Them Together
    $ npm run dev

Postman : ReactAuth

Using Passport
    Session :
        Google Login : (https://console.developers.google.com)(oAuthReact)
            http://localhost:5000/authpassport/google

        Local Register :
            http://localhost:5000/authpassport/local/register
        Local Login :
            http://localhost:5000/authpassport/local/login

    Token :
        JWT Rwegister :
            http://localhost:5000/authpassport/jwt/register
        JWT Login :
            http://localhost:5000/authpassport/jwt/login

    Logout :
        http://localhost:5000/authpassport/logout

    Current User :
        http://localhost:5000/authpassport/getuser

    Admin Page :
        http://localhost:5000/admin/adminHome


Using JWT
    JWT Rwegister :
        http://localhost:5000/authjwt/register
    JWT Login :
        http://localhost:5000/authjwt/login

config/dev.js
    googleClientID: "*********",            // google client Id.
    googleClientSecret: "*********",        // googleClient Secret
    jwtSecret: "*********",                 // jwt Secret (can be anything you write)
    cookieKey: "*********",                 // cookie key. (can be anything you write) (used by passportgoogle strategy)

    tokenName: "*********",     will be same that you will use in Header of the request. (can be anything)
    authPassportSession: false,
    authPassportJWT: false,
    authJWT: true               just using JWT (preffered for api, mobile etc.) most common way.

*************

- Create an empty project called "oAuthReact"
- npm init
    MEHMETs-MacBook-Pro:contact-keeper mehmetak$ npm init -y
- Change "package.json"
    Use "server.js" instead of "index.js"
- Install packages
    MEHMETs-MacBook-Pro:jwtReact mehmetak$ npm install express passport passport-google-oauth20@2 passport-local passport-jwt express-validator cookie-session bcryptjs jsonwebtoken
- Dev dependencies
    MEHMETs-MacBook-Pro:jwtReact mehmetak$ npm install -D nodemon concurrently
- Add scripts to "package.json"
    - add "start"
          "scripts": {
            "start": "node server.js",
            "server": "nodemon server.js"
          },
- create file "server.js"
- Git
    - Create a file ".gitignore"
           /node_modules
    - Initialize the git repository
        - MEHMETs-MacBook-Pro:contact-keeper mehmetak$ git init
    - Add all files
        - MEHMETs-MacBook-Pro:contact-keeper mehmetak$ git add .
    - Commit
        - MEHMETs-MacBook-Pro:contact-keeper mehmetak$ git commit -m "Initial Commit"
    - Share in GitHub
        VCS/Import Into Version Control/Share Project in Github
