const { getUser } = require('../services/userController')

exports.handler = async (event, context, callback) => {
  if (event.httpMethod === 'GET' && event.path === '/users') {
    const requestUser = JSON.parse(event.body)
    const authUser = await getUser(requestUser)
    callback(null, {
      statusCode: 200,
      body: authUser
    })
  } else {
    callback(null, {
      statusCode: 400,
      body: {}
    })
  }
}
