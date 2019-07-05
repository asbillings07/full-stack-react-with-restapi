import React, { Component } from 'react';
import Data from './Data';
const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
  }
  state = {
    authedUser: null,
  };

  render() {
    const { authedUser } = this.state;
    const value = {
      authedUser,
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

  signIn = async (email, password) => {
    const user = await this.data.getUser(email, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authedUser: user,
        };
      });
    }
    return user;
  };

  signOut = () => {
    this.setState({ authedUser: null });
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
