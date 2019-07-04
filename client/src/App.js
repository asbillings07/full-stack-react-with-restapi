import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/NotFound';
import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import WithContext from './Context';

export default class app extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
    };
  }

  render() {
    const UserSignUpWithContext = WithContext(UserSignUp);

    return (
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={Courses} /> - Courses
          <Route path="/courses/create" /> - CreateCourse
          <Route path="/courses/:id/update" /> - UpdateCourse
          <Route path="/courses/:id" /> - CourseDetail
          <Route path="/signin" /> - UserSignIn
          <Route path="/signup" component={UserSignUpWithContext} /> -
          UserSignUp
          <Route path="/signout" /> - UserSignOut
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

// import svg from link then <img src={logo} className="App-logo" alt="logo" />
