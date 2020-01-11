const { userValidationChain } = require('./validationChain')
const { authenticateUser } = require('./authenticateUser')
const { getUser, createUser } = require('../services/userController')
const express = require('express')
const router = express.Router()

// middleware error handler

function asyncHandler (cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}

// User Routes
// GET /api/users 200 - Returns the currently authenticated user

router.get('/users', authenticateUser, (req, res, next) => {
  const user = req.currentUser
  const authUser = getUser(user)
  res.status(200).json(authUser)
})

// POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
router.post(
  '/users',
  userValidationChain,
  asyncHandler(async (req, res, next) => {
    const user = req.body
    const createdUser = await createUser(user)
    res
      .location('/')
      .status(201)
      .json(createdUser)
  })
)

module.exports = router
