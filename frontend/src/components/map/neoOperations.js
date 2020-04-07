import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  background: red;
  z-index: 10;
  display: ${(props) => ((props.visible )? "block" : "none")};
`;
export default function NeoOperations({ visible, handleRemoveNode }){
  console.log(visible);
  return (
    <Container 
      visible={visible}
      onClick={handleRemoveNode}
    >
      <button>삭제</button>
    </Container>
  )
};