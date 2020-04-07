import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid black;
`;

const Logo = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
`;

const Nav = styled.nav`
  flex: 8;
`;

const StyledLink = styled(Link)`
  margin-right: 1rem;
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo>로고</Logo>
      <Nav>
        <StyledLink to="/">홈</StyledLink>
        <StyledLink to={"/map"}>맵</StyledLink>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
