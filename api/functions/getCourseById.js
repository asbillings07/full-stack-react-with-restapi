const { getCourseById } = require('../services/courseController')

exports.handler = async (event, context, callback) => {
  if (event.httpMethod === 'GET' && event.path === '/courses') {
    const reqCourseId = +JSON.parse(event.params.id)
    const course = await getCourseById(reqCourseId)
    callback(null, {
      statusCode: 200,
      body: course
    })
  } else {
    callback(null, {
      statusCode: 400,
      body: {}
    })
  }
}
