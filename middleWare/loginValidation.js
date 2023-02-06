const { check } = require(`express-validator`);

module.exports = [
  check(`userName`).notEmpty(),
  check(`Gender`).notEmpty(),
  check(`dateOfBirth`).notEmpty(),
  check(`Email`).isEmail(),
  check(`status`).notEmpty(),
  check(`password`).matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_]).{8,}$/
  )
];
