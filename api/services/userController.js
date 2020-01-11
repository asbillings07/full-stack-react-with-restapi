const { User } = require('../models')
const bcryptjs = require('bcryptjs')

const getUser = user => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress
  }
}
const createUser = user => {
  const passwordHash = bcryptjs.hashSync(user.password)
  return User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
    password: passwordHash
  })
}

module.exports = {
  createUser,
  getUser
}
