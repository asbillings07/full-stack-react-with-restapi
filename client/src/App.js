import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/NotFound';
import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import PrivateRoute from './PrivateRoute';
import UserSignOut from './components/UserSignOut';
import withContext from './Context';

const App = () => {
  const UserSignUpWithContext = withContext(UserSignUp);
  const UserSignInWithContext = withContext(UserSignIn);
  const HeaderWithContext = withContext(Header);
  const UserSignOutWithContext = withContext(UserSignOut);
  const CourseDetailWithContext = withContext(CourseDetail);

  return (
    <Router>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={Courses} /> - Courses
        <PrivateRoute path="/courses/create" component={CreateCourse} /> -
        CreateCourse
        <PrivateRoute path="/courses/:id/update" component={UpdateCourse} /> -
        UpdateCourse
        <Route path="/courses/:id" component={CourseDetailWithContext} /> -
        CourseDetail
        <Route path="/signin" component={UserSignInWithContext} /> - UserSignIn
        <Route path="/signup" component={UserSignUpWithContext} /> - UserSignUp
        <Route path="/signout" component={UserSignOutWithContext} /> -
        UserSignOut
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
export default App;

// import svg from link then <img src={logo} className="App-logo" alt="logo" />
