import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  flex: 2;
  display: flex;
  border: 1px solid black;
`;

function Footer() {
  return (
    <FooterContainer>Footer</FooterContainer>
  );
}

export default Footer;
