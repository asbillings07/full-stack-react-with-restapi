import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import NotFound from './components/NotFound';
import Courses from './components/courses/Courses';
import UserSignIn from './components/users/UserSignIn';
import UserSignUp from './components/users/UserSignUp';
import CourseDetail from './components/courses/CourseDetail';
import CreateCourse from './components/courses/CreateCourse';
import UpdateCourse from './components/courses/UpdateCourse';
import PrivateRoute from './PrivateRoute';
import UserSignOut from './components/users/UserSignOut';
import withContext from './Context';

const App = () => {
  const UserSignUpWithContext = withContext(UserSignUp);
  const UserSignInWithContext = withContext(UserSignIn);
  const HeaderWithContext = withContext(Header);
  const UserSignOutWithContext = withContext(UserSignOut);
  const CourseDetailWithContext = withContext(CourseDetail);
  const CreateCourseWithContext = withContext(CreateCourse);
  const UpdateCourseWithContext = withContext(UpdateCourse);

  return (
    <Router>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={Courses} />
        <PrivateRoute
          path="/courses/create"
          component={CreateCourseWithContext}
        />
        <PrivateRoute
          path="/courses/:id/update"
          component={UpdateCourseWithContext}
        />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/error" component={UnhandledError} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
export default App;

// import svg from link then <img src={logo} className="App-logo" alt="logo" />
