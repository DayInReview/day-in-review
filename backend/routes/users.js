const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretOrKey = require("../config").secretOrKey;

// Input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// User model
const User = require("../models").User;

/**
 * @route POST users/register
 * @description Registers user
 * @access Public
 */
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    // Validation returned false -> pass on errors
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // User already exists (by email)
      return res.status(400).json({ email: "Email already exists" });
    } else {
      // Create new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => {
            res.json(user);
          }).catch(err => {
            console.log(err);
          });
        })
      });
    }
  });
});


/**
 * @route POST users/login
 * @description Login user and return JWT token
 * @access Public
 */
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found"});
    }
    // Check password if user exists
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Create JWT Payload
        const payload = {
          is: user.id,
          name: user.name
        }
        // Sign token
        jwt.sign(
          payload,
          secretOrKey,
          {
            expiresIn: 604800 // 1 week in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({
          passwordincorrect: "Password incorrect",
        });
      }
    });
  });
});

module.exports = router;
