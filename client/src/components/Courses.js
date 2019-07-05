import React, { Component } from 'react';
import axios from 'axios';
import AddCourse from './AddCourse';
import config from '../config';

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
    const res = await axios.get(`${config.apiBaseUrl}/courses`);
    console.log(res.data);
    this.setState({ courses: res.data });
  };

  showCourse = () => {
    return this.state.courses.map((course, index) => (
      <React.Fragment key={index}>
        <div className="grid-33">
          <a
            className="course--module course--link"
            href={`/courses/:${course.id}`}
          >
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
          </a>
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
