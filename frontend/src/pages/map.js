import React, { useState , useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

const Title = styled.div`
  flex: 1;
  border-bottom: 1px solid black;
`;

const Contents = styled.div`
  flex: 9;
  display: flex;
  flex-direction: row;
`;

const Forms = styled.div`
  flex :2;
  display: flex;
  flex-direction: column;
  border-right: 1px solid black;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
`;

const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const NodesContainer = styled.div`
  flex: 8;
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
`;

const Node = styled.div`
  width: 5rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  border: 1px solid black;
`;


const list = [
  '경제',
  '기술',
  '사회',
];

function SystemMap() {
  const [currentList, setCurrentList] = useState(null);
  const [node, setNode] = useState(''); // 
  const [feild, setFeild] = useState('경제');
  const [nodeAfield, setNodeAfeild] = useState('경제');
  const [nodeBfield, setNodeBfeild] = useState('경제');
  const [direction, setDirection] = useState(''); // + or - and power
  const [nodeA, setNodeA] = useState('');
  const [nodeB, setNodeB] = useState('');
  useEffect(() =>{ 
    axios.get('/api/neo4j/all')
      .then(({ data }) => {
        setCurrentList(data);
      });
  }, []);

  const handleNode = (e) => {
    const { value } = e.target;
    setNode(value);
  };

  const handleDirectoin = (e) => {
    const { value } = e.target;
    setDirection(value);
  };

  const handleFeild = (e) => {
    const { value } = e.target;
    setFeild(value);
  };

  const handleConnectionNode = (e) => {
    const { value, name } = e.target;
    if (name === 'nodeA') {
      setNodeA(value);
    }
    if (name === 'nodeB') {
      setNodeB(value);
    }
  };

  const handleNodeAfeild = (e) => {
    const { value } = e.target;
    setNodeAfeild(value)
  }

  const handleNodeBfeild = (e) => {
    const { value } = e.target;
    setNodeBfeild(value);
  }

  const handleNodeSubmit = (e) => {
    e.preventDefault();
    const data = {
      node,
      feild,
    };
    setNode('');
    setFeild('경제');
    axios.post('/api/neo4j/add', data)
      .then(() => {
        console.log('success');
      })
      .catch(err => {console.log(err)});
  };

  const handleConnectionSumbit = (e) => {
    e.preventDefault();
    if (nodeA === nodeB) {
      return '서로 다른 값을 선택해야 합니다.'
    }
    const data = {
      nodeA,
      nodeB,
      nodeAfield,
      nodeBfield,
      direction: direction >= 0 ? 'POSITIVE' : 'NEGATIVE',
    };
    initialize();
    axios.post('/api/neo4j/connection', data)
      .then(() => {
        console.log('connection success');
      })
      .catch(err => {console.log(err)});
  };

  const initialize = () => {

    setNodeAfeild("경제");
    setNodeBfeild("경제");
    setDirection(0);
    setNodeA("");
    setNodeB("");
  };
  return (
    <Container>
      <Title>
        <h2>SYETEM MAP</h2>
      </Title>
      <Contents>
        <Forms>
          <StyledForm
            method="post"
            onSubmit={handleNodeSubmit}
          >
            <h2>변수 추가</h2>
            <StyledLabel>
              변수
              <input type="text" name="node" value={node} onChange={handleNode} required/>
            </StyledLabel>
            <StyledLabel>
              분야
              <select required onChange={handleFeild}>
                {list.map((each) => <option value={each}>{each}</option>)}
              </select>
            </StyledLabel>
            <button type="submit">추가</button>
          </StyledForm>
          <StyledForm
            method="post"
            onSubmit={handleConnectionSumbit}
          >
            <h2>변수 연결</h2>
            <StyledLabel>
              출발변수(NodeA)
              <input type="text" name="nodeA" value={nodeA} onChange={handleConnectionNode} required/>
            </StyledLabel>
            <StyledLabel>
              NodeA 필드
              <select required onChange={handleNodeAfeild} defaultValue={feild}>
                {list.map((each) => <option value={each}>{each}</option>)}
              </select>
            </StyledLabel>
            <StyledLabel>
              도착변수(NodeB)
              <input type="text" name="nodeB" value={nodeB} onChange={handleConnectionNode} required/>
            </StyledLabel>
            <StyledLabel>
              NodeB 필드
              <select required onChange={handleNodeBfeild}>
                {list.map((each) => <option value={each}>{each}</option>)}
              </select>
            </StyledLabel>
            <StyledLabel>
              방향성
              <select required onChange={handleDirectoin} defaultValue={0}>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
                <option value={0}>0</option>
                <option value={-1}>-1</option>
                <option value={-2}>-2</option>
                <option value={0-3}>-3</option>
              </select>
            </StyledLabel>
            <button type="submit">연결</button>
          </StyledForm>
        </Forms>
        <NodesContainer>{currentList && (
          currentList.map((eactData) => (
            <Node id={eactData.identity}>
              {eactData.labels.map((label) => <>{label}</>)}
              <div>{eactData.properties.node}</div>
            </Node>
          ))
        )}</NodesContainer>
      </Contents>
    </Container>
  );
}

export default SystemMap;
