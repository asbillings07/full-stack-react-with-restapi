const { getCourses } = require('../services/courseController')

exports.handler = async (event, context, callback) => {
  if (event.httpMethod === 'GET' && event.path === '/courses') {
    const courses = getCourses()
    callback(null, {
      statusCode: 200,
      body: courses
    })
  } else {
    callback(null, {
      statusCode: 400,
      body: {}
    })
  }
}
