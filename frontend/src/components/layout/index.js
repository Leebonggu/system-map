import React from 'react';
import styled from 'styled-components';
import Header from './header';
import Footer from './footer';

const Wrapper = styled.div`
  width: 1024px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1024px) {
    width: 768px;
  }
  @media screen and (max-width: 768px) {
    width:100%;
  }
`;

const Container = styled.div`
  flex: 7;
  display: flex;
`;

function Layout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Container>
        {children}
      </Container>
      <Footer />
    </Wrapper>
  );
}

export default Layout;
