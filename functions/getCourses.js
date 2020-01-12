import { getAllCourses } from '../src/apiServices/courses'

exports.handler = async (event, context, callback) => {
  if (event.httpMethod === 'GET' && event.path === '/courses') {
    const courses = getAllCourses()
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
