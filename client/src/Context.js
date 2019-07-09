import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';
const Context = React.createContext();

export class Provider extends Component {
  data = new Data();
  // storing cookies in state
  state = {
    authedUser: Cookies.getJSON('authedUser') || null,
    password: Cookies.get('password'),
  };

  render() {
    const { authedUser } = this.state;
    const { password } = this.state;
    const value = {
      authedUser,
      password,

      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
  // signs in user and sets auth user and password in cookies.
  signIn = async (email, password) => {
    const user = await this.data.getUser(email, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authedUser: user,
          password,
        };
      });
      Cookies.set('authedUser', JSON.stringify(user), { expires: 7 });
      Cookies.set('password', password);
    }
    return user;
  };
  // signs out user and removes cookies
  signOut = () => {
    this.setState({ authedUser: null });
    Cookies.remove('authedUser');
    Cookies.remove('password');
    console.log(`Logout Successful`);
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
// Fixes
/*
*import of api url*
I had to slightly fix this to get your app to run; mainly because of some invalid paths and string casing.
Make sure the path of your config file is correct in every file that you import this.
There were a quite a few files, but I think I only had to correct one of the paths.
Also, the file name is 'Config.js', which means that you should be importing with the exact casing of the filename.
E.g.: `import './Config'`
--------------------------------------------
*Needs*:
*1.) Stateful Components*
Your `UpdateCourse` components 'Cancel' button does not redirect the user back to course detail screen, but to the home page, the list of courses.

*Exceeds attempted*:
*1.) Stateful Class Components*:
 a.) For `CourseDetail`, this component is not redirecting to the 'not found' page if I navigate to a non-existent course, such as `http://localhost:3000/courses/123456`

 b.) For `UpdateCourse`, the same is  happening here.
If I navigate to a non-existent course to update, such as http://localhost:3000/courses/123456/update; the `UpdateCourse` component renders.


*/
