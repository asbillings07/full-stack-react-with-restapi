import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/NotFound';

export default class app extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ loading: true });
    const res = await axios.get('/api/courses');
    console.log(res.data);
    this.setState({ data: res.data, loading: false });
  };

  render() {
    return (
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" /> - Courses
          <Route path="/courses/create" /> - CreateCourse
          <Route path="/courses/:id/update" /> - UpdateCourse
          <Route path="/courses/:id" /> - CourseDetail
          <Route path="/signin" /> - UserSignIn
          <Route path="/signup" /> - UserSignUp
          <Route path="/signout" /> - UserSignOut
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

// import svg from link then <img src={logo} className="App-logo" alt="logo" />
