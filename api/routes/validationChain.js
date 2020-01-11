const { check, validationResult } = require('express-validator')
const { User } = require('../models')

const valdationMiddleWare = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg)
    res.status(400).json({ errors: errorMessages })
  } else {
    next()
  }
}

const userValidationChain = [
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
            new Error('E-mail already in use, please use another email')
          )
        }
      })
    }),
  check('password')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for password')
    .isLength({ min: 8 })
    .withMessage('Please provide a password that is at least 8 chars long'),
  valdationMiddleWare
]

const courseValidationChain = [
  check('title')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a Course Title'),
  check('description')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a Course Description'),
  valdationMiddleWare
]

module.exports = {
  userValidationChain,
  courseValidationChain
}
