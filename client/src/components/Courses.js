import React, { Component } from 'react';
import axios from 'axios';
import ShowCourse from './ShowCourse';
import AddCourse from './AddCourse';

export default class Courses extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    this.getAllCourses();
  }

  getAllCourses = async () => {
    this.setState({ loading: true });
    const res = await axios.get('/api/courses');
    console.log(res.data);
    this.setState({ courses: res.data });
  };

  showCourse = () => {
    this.state.courses.map(course => (
      <ShowCourse title={course.title} key={course.id} />
    ));
  };

  render() {
    return (
      <React.Fragment>
        {this.showCourse()}
        <AddCourse />
      </React.Fragment>
    );
  }
}
