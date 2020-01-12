const { updateCourse } = require('../services/courseController')

exports.handler = async (event, context, callback) => {
  if (event.httpMethod === 'PUT' && event.path === '/courses/:id') {
    const reqCourseId = +JSON.parse(event.params.id)
    const course = await updateCourse(reqCourseId)
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
