const { check } = require('express-validator');
const { User } = require('../models');
// validation for route
const validationChain = [
  check('firstName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for firstName'),
  check('lastName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for lastName'),
  check('emailAddress')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for emailAddress')
    .isEmail()
    .withMessage('Email Address must be formatted correctly')
    .custom(value => {
      return User.findOne({ where: { emailAddress: value } }).then(user => {
        if (user) {
          return Promise.reject(
            'E-mail already in use, please use another email'
          );
        }
      });
    }),
  check('password')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for password')
    .isLength({ min: 8 })
    .withMessage('Please provide a password that is at least 8 chars long'),
];
exports.validationChain = validationChain;
