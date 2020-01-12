import React, { Component } from 'react';
import CourseForm from './CourseForm';
import axios from 'axios';
import config from '../../config';

export default class UpdateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    firstName: '',
    lastName: '',
    userId: '',
    errors: [],
  };

  componentDidMount() {
    this.getData();
  }
  // function that hits the REST API and updates state with current information
  getData = async () => {
    const { id } = this.props.match.params;
    const { authedUser } = this.props.context;

    try {
      const data = await axios.get(`${config.apiBaseUrl}/courses/${id}`);
      if (data) {
        const course = data.data[0];
        this.setState({
          title: course.title,
          description: course.description,
          estimatedTime: course.estimatedTime,
          materialsNeeded: course.materialsNeeded,
          userId: course.userId,
          firstName: course.user.firstName,
          lastName: course.user.lastName,
        });
        // checking if authed user if they happen to try to navigate to this page. If they are not authed it kicks to forbidden route.
        if (authedUser.id === this.state.userId) {
        } else {
          this.props.history.push('/forbidden');
        }
      } else {
        throw Error();
      }
    } catch (err) {
      console.log(err);
      this.props.history.push('/notfound');
    }
  };

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      firstName,
      lastName,
      errors,
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        {/* Componenet Form that renders input and textarea elements */}
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
                  <p>By Author: {`${firstName} ${lastName}`}</p>
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
  // on change set the name in the element to the value of the input
  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };
  // function that checks if they are authed user then allows them to update course.
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
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });
  };

  cancel = () => {
    const { id } = this.props.match.params;
    this.props.history.push(`/courses/${id}`);
  };
}
