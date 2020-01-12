import { Users } from '../../firestoreDb'
// create user routes

const getUser = id =>
  Users.doc(id)
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

const createUser = user =>
  Users.add(user)
    .then(() => {
      console.log('Document successfully written!')
    })
    .catch(error => {
      console.error('Error writing document: ', error)
    })

const updateUser = (id, user) =>
  Users.doc(id)
    .update(user)
    .then(() => {
      console.log('Document successfully written!')
    })
    .catch(error => {
      console.error('Error writing document: ', error)
    })

const deleteUser = id =>
  Users.doc(id)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!')
    })
    .catch(error => {
      console.error('Error removing document: ', error)
    })

export { getUser, updateUser, createUser, deleteUser }
