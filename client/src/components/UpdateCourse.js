import React, { Component } from 'react';
import CourseForm from './CourseForm';
import axios from 'axios';
import config from '../config';
import CourseDetail from './CourseDetail';

export default class UpdateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    course: [],
    errors: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { id } = this.props.match.params;
    const data = await axios.get(`${config.apiBaseUrl}/courses/${id}`);
    const course = data.data[0];
    this.setState({
      course,
    });
  };

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      course,
      errors,
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>

        <CourseForm
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="input-title course--title--input"
                    placeholder={course.title}
                    value={title}
                    onChange={this.change}
                  />
                  <p>By Author {course.userId}</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea
                      id="description"
                      name="description"
                      className=""
                      placeholder={course.description}
                      value={description}
                      onChange={this.change}
                    />
                  </div>
                </div>
              </div>

              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        className="course--time--input"
                        placeholder={course.estimatedTime}
                        value={estimatedTime}
                        onChange={this.change}
                      />
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          className=""
                          placeholder={course.materialsNeeded}
                          value={materialsNeeded}
                          onChange={this.change}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }

  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    const { authedUser, data } = this.props.context;
    const { context } = this.props;

    const { title, description, estimatedTime, materialsNeeded } = this.state;
    const info = { title, description, estimatedTime, materialsNeeded };
    const { id } = this.props.match.params;

    data
      .updateCourse(authedUser.emailAddress, context.password, info, id)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          alert('Course Updated Successfully');
          this.props.history.push(`/courses/${id}`);
        }
      });
  };

  cancel = () => {
    this.props.history.push('/');
  };
}
