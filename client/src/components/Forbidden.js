import React from 'react';
import styled from 'styled-components';

const Forbidden = () => {
  return (
    <Container>
      <div className="bounds">
        <h1>Forbidden</h1>
        <Padding>
          <Button href="/">Home</Button>
        </Padding>
        <Text>
          You can't update courses that you don't own. Create your own course or
          navigate to a course you own and try again.
        </Text>
        <iframe
          src="https://giphy.com/embed/l41ofhO7rXV9WFECQ"
          title="forbidden"
          width="480"
          height="385"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        />
      </div>
    </Container>
  );
};

const Button = styled.a`
  backgroud: transparent;
  border-radius: 3px;
  border: 2px solid lightblue;
  color: blue;
  margin: 0 1em;
  padding: 0.25em 1em;

  &:hover {
    background: blue;
    color: white;
  }
`;

const Container = styled.div`
  text-align: center;
`;

const Padding = styled.div`
  padding: 15px;
`;

const Text = styled.p`
  color: red;
  font-size: 25px;
`;

export default Forbidden;
