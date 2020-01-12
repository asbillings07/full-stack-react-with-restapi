import React, { Component } from 'react';
import axios from 'axios';
import AddCourse from './AddCourse';
import Spinner from '../Spinner';
import config from '../../config';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default class Courses extends Component {
  state = {
    courses: [],
    loading: true,
  };

  componentDidMount() {
    this.getAllCourses();
  }
  // function pulls all courses from REST API
  getAllCourses = async () => {
    const courses = await axios
      .get(`${config.apiBaseUrl}/courses`)
      .catch(err => {
        console.log(err.status);
        this.props.history.push('/error');
      });
    if (courses) {
      this.setState({ courses: courses.data, loading: false });
    }
  };
  // maps through all of the courses and displays them on the "/" page
  showCourse = () => {
    return this.state.courses.map(course => (
      <React.Fragment key={course.id}>
        <div className="grid">
          <Link
            className="course--module course--link"
            to={`/courses/${course.id}`}
          >
            <h4 className="course--label">Course</h4>
            <FlexText>{course.title}</FlexText>
          </Link>
        </div>
      </React.Fragment>
    ));
  };

  render() {
    if (this.state.loading) {
      return <Spinner size="4x" spinning="spinning" />;
    } else {
      return (
        <React.Fragment>
          {this.showCourse()}
          <AddCourse />
        </React.Fragment>
      );
    }
  }
}

const FlexText = styled.h3`
  font-size: 18px;
  color: #fff;
  /* phones */
  @media (max-device-width: 767px) {
    font-size: 16px;
  }

  /* pads */
  @media (min-device-width: 768px) and (max-device-width: 1024px) {
    font-size: 16px;
  }
`;
