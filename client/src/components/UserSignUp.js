import React, { component } from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';

export default class UserSignUp extends component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    errors: [],
  };

  render() {
    const { firstName, lastName, username, password, errors } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={this.change}
                  placeholder="First Name"
                />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={this.change}
                  placeholder="Last Name"
                />
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={this.change}
                  placeholder="User Name"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password"
                />
              </React.Fragment>
            )}
          />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }
  change = event => {
    const fname = event.target.firstName;
    const lname = event.target.lastName;
    const fvalue = event.target.fvalue;
    const lvalue = event.target.lvalue;

    this.setState(() => {
      return {
        [fname]: fvalue,
        [lname]: lvalue,
      };
    });
  };

  submit = () => {
    const { context } = this.props;

    const { firstName, lastName, username, password } = this.state;

    const user = {
      firstName,
      lastName,
      username,
      password,
    };

    context.data.createUser(user);
  };

  cancel = () => {};
}
