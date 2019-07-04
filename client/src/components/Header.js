import React from 'react';
import UserSignOut from './UserSignOut';
const Header = props => {
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          <span>Welcome Joe Smith!</span>
          <UserSignOut />
        </nav>
      </div>
    </div>
  );
};

export default Header;
