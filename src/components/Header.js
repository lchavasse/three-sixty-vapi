import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #3a86ff;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

function Header() {
  return (
    <HeaderContainer>
      <Title>360° Feedback</Title>
      <Subtitle>
        Share your valuable insights with our AI assistant.
      </Subtitle>
    </HeaderContainer>
  );
}

export default Header;