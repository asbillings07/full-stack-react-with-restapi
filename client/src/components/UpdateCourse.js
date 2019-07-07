import React, { Component } from 'react';
import CourseForm from './CourseForm';
import axios from 'axios';
import config from '../config';

export default class UpdateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: '',
    errors: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { id } = this.props.match.params;
    const data = await axios
      .get(`${config.apiBaseUrl}/courses/${id}`)
      .catch(err => {
        this.props.history.push('/notfound');
      });
    if (data) {
      const course = data.data[0];
      this.setState({
        title: course.title,
        description: course.description,
        estimatedTime: course.estimatedTime,
        materialsNeeded: course.materialsNeeded,
        userId: course.userId,
      });
    }
  };

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
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
                    placeholder=""
                    value={title}
                    onChange={this.change}
                  />
                  <p>By Author {userId}</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea
                      id="description"
                      name="description"
                      className=""
                      placeholder=""
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
                        placeholder=""
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
                          placeholder=""
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

    const {
      title,
      userId,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;
    const info = { title, description, estimatedTime, materialsNeeded };
    const { id } = this.props.match.params;
    if (authedUser.id === userId) {
      data
        .updateCourse(authedUser.emailAddress, context.password, info, id)
        .then(errors => {
          if (errors.length) {
            this.setState({ errors });
          } else {
            alert('Course Updated Successfully');
            this.props.history.push(`/courses/${id}`);
          }
        })
        .catch(err => {
          console.log(err);
          this.props.history.push('/error');
        });
    } else {
      this.props.history.push('/forbidden');
    }
  };

  cancel = () => {
    this.props.history.push('/');
  };
}
