import firebase from 'firebase'
import Config from './src/Config'
require('firebase/firestore')

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: Config.fireBaseApiKey,
  authDomain: Config.authDomain,
  projectId: Config.projectId
})

const db = firebase.firestore()
const Users = db.collection('users')
const Courses = db.collection('courses')

export { Users, Courses }
