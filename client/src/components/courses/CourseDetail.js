import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import config from '../../config';

export default class CourseDetail extends Component {
  state = {
    firstName: '',
    lastName: '',
    course: [],
    message: '',
  };

  componentDidMount() {
    this.getCourses();
  }
  // function pulls only the requested course from REST API
  getCourses = async () => {
    const { id } = this.props.match.params;
    try {
      const data = await axios.get(`${config.apiBaseUrl}/courses/${id}`);

      if (data) {
        const course = data.data[0];
        this.setState({
          course,
          firstName: course.user.firstName,
          lastName: course.user.lastName,
        });
      } else {
        throw Error();
      }
    } catch (err) {
      console.log(err);
      this.props.history.push('/notfound');
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
    }
  };
  // deletes course from REST API via delete method
  deleteCourse = () => {
    const { id } = this.props.match.params;
    const { authedUser } = this.props.context;
    const { data } = this.props.context;
    const { context } = this.props;

    data
      .deleteCourse(authedUser.emailAddress, context.password, id)
      .then(errors => {
        if (errors.length) {
          this.setState({ message: errors });
        } else {
          alert('Course Deleted Successfully');
          this.props.history.push('/');
        }
      });
  };

  render() {
    const { course, firstName, lastName } = this.state;
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
              <p>By Author: {`${firstName} ${lastName}`} </p>
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
