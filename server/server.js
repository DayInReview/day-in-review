require('dotenv').config(); // Sets all environment variables in the .env flie

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express(); // generate an app object
const db = require("./models/"); // MongoDB models
const passport = require("passport");
const PORT = process.env.PORT || 5000;

// Routes
const users = require("./routes/users/users");
const todos = require("./routes/todos/todos");
const grades = require("./routes/grades");

// Middleware
app.use(bodyParser.json()); // telling the app that we are going to use json to handle incoming payload
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());
app.use(passport.initialize());
require("./passport")(passport);  // Configures passport

app.use("/api/users", users);
app.use("/api/todos", passport.authenticate('jwt', { session: false }), todos);
app.use("/api/grades", passport.authenticate('jwt', { session: false }), grades);

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request",
  });
});

app.listen(PORT, () => {
  // listening on port 5000
  console.log(`listening on port ${PORT}`); // print this when the server starts
});
