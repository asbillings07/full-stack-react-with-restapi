import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

export default props => (
  <Container>
    <FontAwesomeIcon
      className={`fadeIn ${props.spinning}`}
      icon={faSync}
      size={props.size}
    />
    <H1>{'Loading.....'}</H1>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const H1 = styled.h1`
  margin-top: 15px;
`;
