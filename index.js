const express = require("express");
const port = 8002;
const app = express();
// const db = require("./config/db");
const passport = require("passport");
const jwtPassport = require("./config/passport_jwt_strategy");
const session = require("express-session");


const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ayushitrapasiya:h4ZTJelyZSrrm8KH@cluster0.29goa.mongodb.net/ApiData").then(console.log("db is connect...")).catch((err) => {
console.log("db is not connect..")
})



app.use(express.urlencoded());

app.use(
  session({
    name: "jwtSession",
    secret: "jwtJJ",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes"));

app.listen(port, (err) => {
  err
    ? console.log(err)
    : console.log("Server is running on http://localhost:" + port);
});
