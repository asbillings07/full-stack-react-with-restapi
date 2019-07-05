import React, { Component } from 'react';
import axios from 'axios';
import AddCourse from './AddCourse';
import config from '../config';
import { Link } from 'react-router-dom';

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
    const courses = await axios.get(`${config.apiBaseUrl}/courses`);
    this.setState({ courses: courses.data });
  };

  showCourse = () => {
    return this.state.courses.map(course => (
      <React.Fragment key={course.id}>
        <div className="grid-33">
          <Link
            className="course--module course--link"
            to={`/courses/${course.id}`}
          >
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        </div>
      </React.Fragment>
    ));
  };

  render() {
    // const { context } = this.props;
    // const authUser = context.authedUser;

    return (
      <React.Fragment>
        {this.showCourse()}
        <AddCourse />
      </React.Fragment>
    );
  }
}
