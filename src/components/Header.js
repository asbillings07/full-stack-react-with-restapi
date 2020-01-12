import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Header = ({ context }) => {
  const authUser = context.authedUser;
  return (
    <div className="header">
      <div className="bounds">
        <Logo>
          CourseShare // <Span>An Online Learning Community</Span>{' '}
        </Logo>
        <nav>
          {authUser ? (
            <React.Fragment>
              <span>Welcome, {authUser.firstName}! </span>
              <Link to="/signout">Sign Out</Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link className="signup" to="/signup">
                Sign Up
              </Link>
              <Link className="signin" to="/signin">
                Sign In
              </Link>
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  );
};
export default Header;

const Span = styled.span`
  font-weight: 'normal';
`;

const Logo = styled.h1`
  color: #fff;
  font-size: 24px;
  padding: 0 15px;
  margin: 0;
  display: inline-block;
`;
