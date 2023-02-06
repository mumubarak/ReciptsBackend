const { check } = require(`express-validator`);

module.exports = [
  check(`serialNumber`).notEmpty(),
  check(`vendor`).notEmpty(),
  check(`category`).notEmpty(),
  check(`service`).notEmpty(),
  check(`amount`).notEmpty(),
  check(`status`).notEmpty(),
  check(`totalAmount`).notEmpty(),
  check(`items`).notEmpty(),
  check(`userId`).notEmpty(),

  
];
