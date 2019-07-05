import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      errors: [],
    };
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Create Courses</h1>

        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Create Course"
          elements={() => (
            <React.Fragment>
              <input
                id="email"
                name="email"
                type="text"
                value={email}
                onChange={this.change}
                placeholder="Email Address"
              />
            </React.Fragment>
          )}
        />
      </div>
    );
  }

  submit = () => {};

  cancel = () => {};
}
