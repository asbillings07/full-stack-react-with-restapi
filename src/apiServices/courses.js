import { Courses } from '../../firestoreDb'

// create course routes
const getAllCourses = () =>
  Courses.get()
    .then(doc => {
      if (doc.exists) {
        console.log('Document data:', doc.data())
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    })
    .catch(error => {
      console.log('Error getting document:', error)
    })

const getCourseById = id =>
  Courses.doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        console.log('Document data:', doc.data())
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    })
    .catch(error => {
      console.log('Error getting document:', error)
    })

const createCourse = course =>
  Courses.add(course)
    .then(() => {
      console.log('Document successfully written!')
    })
    .catch(error => {
      console.error('Error writing document: ', error)
    })

const updateCourse = (course, id) =>
  Courses.doc(id)
    .update(course)
    .then(() => {
      console.log('Document successfully written!')
    })
    .catch(error => {
      console.error('Error writing document: ', error)
    })

const deletedCourse = id =>
  Courses.doc(id)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!')
    })
    .catch(error => {
      console.error('Error removing document: ', error)
    })

export {
  createCourse,
  updateCourse,
  deletedCourse,
  getAllCourses,
  getCourseById
}
