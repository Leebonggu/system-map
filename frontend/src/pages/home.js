import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;


function Home() {
  return (
    <Container>home</Container>
  );
}

export default Home;
