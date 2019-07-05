import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/NotFound';
import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import PrivateRoute from './PrivateRoute';
import UserSignOut from './components/UserSignOut';
import withContext from './Context';

const App = () => {
  const UserSignUpWithContext = withContext(UserSignUp);
  const UserSignInWithContext = withContext(UserSignIn);
  const HeaderWithContext = withContext(Header);
  const CoursesWithContext = withContext(Courses);
  const UserSignOutWithContext = withContext(UserSignOut);

  return (
    <Router>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={Courses} /> - Courses
        <PrivateRoute path="/courses" component={CoursesWithContext} />
        <PrivateRoute path="/courses/create" /> - CreateCourse
        <PrivateRoute path="/courses/:id/update" /> - UpdateCourse
        <Route path="/courses/:id" /> - CourseDetail
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
