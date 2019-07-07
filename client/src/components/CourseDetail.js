import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import config from '../config';

export default class CourseDetail extends Component {
  state = {
    course: [],
    message: '',
  };

  componentDidMount() {
    this.getCourses();
  }

  getCourses = async () => {
    const { id } = this.props.match.params;
    const course = await axios
      .get(`${config.apiBaseUrl}/courses/${id}`)
      .catch(err => {
        this.props.history.push('/notfound');
        console.log(err);
      });
    if (course) {
      this.setState({ course: course.data[0] });
    }
  };
  // function that confirms if user wants to delete course
  confirmDelete = () => {
    const deleteIt = window.confirm(
      'Careful...Are you sure you want to delete this course? There is no going back.'
    );
    if (deleteIt) {
      this.deleteCourse();
    } else {
      console.log('Whew! that was close!');
    }
  };

  deleteCourse = () => {
    const { id } = this.props.match.params;
    const { authedUser } = this.props.context;
    const { context } = this.props;
    const { userId } = this.state.course;

    if (userId === authedUser.id) {
      axios
        .delete(`${config.apiBaseUrl}/courses/${id}`, {
          auth: {
            username: authedUser.emailAddress,
            password: context.password,
          },
        })
        .then(res => {
          if (res.status === 204) {
            this.setState({
              course: '',
              message: 'Course Deleted Successfully',
            });
            this.props.history.push(`/`);
            alert('Course deleted Successfully');
          } else if (res.status === 401 || res.status === 403) {
            this.setState({
              message: res.error.message,
            });
          }
        });
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          message:
            'You can not delete courses that you do not own, choose another course and try again.',
        };
      });
    }
  };

  render() {
    const { course } = this.state;
    const { authedUser } = this.props.context;
    const pMarkdown = `${course.description}`;
    const liMarkdown = `${course.materialsNeeded}`;
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                {/* The authenticated user's ID matches that of the user who owns the course. */}
                {authedUser && authedUser.id === course.userId ? (
                  <Link className="button" to={`/courses/${course.id}/update`}>
                    Update Course
                  </Link>
                ) : (
                  ''
                )}
                {authedUser && authedUser.id === course.userId ? (
                  <button
                    className="button"
                    onClick={() => this.confirmDelete()}
                  >
                    Delete Course
                  </button>
                ) : (
                  ''
                )}
              </span>
              <Link className="button button-secondary" to="/">
                Return to List
              </Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <h2>{this.state.message}</h2>
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
              <p>By Author ID: {course.userId} </p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={pMarkdown} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <ReactMarkdown source={liMarkdown} />
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
