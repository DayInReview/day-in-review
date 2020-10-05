const Validator = require("validator");
const isEmpty = require("is-empty");

function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields for use with validator
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Check fields
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // Give back errors
  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateLoginInput;
