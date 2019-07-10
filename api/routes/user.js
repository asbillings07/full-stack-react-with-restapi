const { validationChain } = require('./validationChain');
const { authenticateUser } = require('./authenticateUser');
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

// middleware error handler

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

// User Routes
//GET /api/users 200 - Returns the currently authenticated user

router.get('/users', authenticateUser, (req, res, next) => {
  const user = req.currentUser;

  res.status(200).json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
  });
});

//POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
router.post(
  '/users',
  validationChain,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      res.status(400).json({ errors: errorMessages });
    } else {
      const user = req.body;
      user.password = bcryptjs.hashSync(user.password);
      await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        password: user.password,
      });
      res
        .location('/')
        .status(201)
        .end();
    }
  })
);

module.exports = router;
