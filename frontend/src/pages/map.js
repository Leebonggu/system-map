import React, { useState , useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import VisGraph from '../components/map/visjs-test';
import VisReact from '../components/map/visjs';

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
  border-right: ${(props) => props.left && '1px solid black'};
  border-left: ${(props) => props.right && '1px solid black'};
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
`;

const FlexButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
`;

const StyledButton = styled.button`
  background: ${props => props.bg};
  color: ${props => props.fontColor};
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
  overflow: auto;
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
  z-index: 1;
`;

const list = [
  '경제',
  '기술',
  '사회',
];

function SystemMap() {
  const [currentNodes, setCurrentNodes] = useState(null);
  const [currentEdges, setCurrentEdges] = useState(null);
  const [node, setNode] = useState(''); // 
  const [feild, setFeild] = useState('경제');
  const [nodeAfield, setNodeAfeild] = useState('경제');
  const [nodeBfield, setNodeBfeild] = useState('경제');
  const [direction, setDirection] = useState(''); // + or - and power
  const [nodeA, setNodeA] = useState('');
  const [nodeB, setNodeB] = useState('');
  const [toggle, setToggle] = useState(false);
  const [connectStart, setConnectStart] = useState(false);
  const [nodeBox, setNodeBox] = useState([]);
  // const itemsRef = useRef([]);

  useEffect(() =>{ 
    axios.get('/api/neo4j/all')
      .then(({ data }) => {
        const { nodes, edges } = data;
        setCurrentNodes(nodes);
        setCurrentEdges(edges);
        // itemsRef.current = itemsRef.current.slice(0, data.length);
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
  };

  const handleNodeBfeild = (e) => {
    const { value } = e.target;
    setNodeBfeild(value);
  };

  const handleNodeSubmit = (e) => {
    e.preventDefault();
    const data = {
      node,
      feild,
    };
    const checkCurrentNode = currentNodes.filter((each) => (each.properties.node === node && each.properties.feild === feild));
    if (checkCurrentNode.length > 0) {
      alert(`이미 존재하는 값입니다. node: ${node}, field: ${feild}`);
      setNode('');
      setFeild('경제');
      return;
    }
    setNode('');
    setFeild('경제');
    axios.post('/api/neo4j/add', data)
      .then(() => {
        console.log('success');
        window.location.reload();
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
      power: direction,
    };
  
    initialize();
    axios.post('/api/neo4j/connection', data)
      .then(() => {
        console.log('connection success');
        window.location.reload();
      })
      .catch(err => {console.log(err)});
  };

  const handleVariableClick = (e) => {
    e.preventDefault();
    let data;
    if (nodeBox.length === 2) {
      data = {
        nodeA: nodeBox[0].properties.node,
        nodeB: nodeBox[1].properties.node,
        nodeAfield: nodeBox[0].properties.feild,
        nodeBfield: nodeBox[1].properties.feild,
        direction: direction >= 0 ? 'POSITIVE' : 'NEGATIVE',
      };
    };
    axios.post('/api/neo4j/connection', data)
      .then(() => {
        window.location.reload();
      })
      .catch(err => {console.log(err)});
  }
 
  const initialize = () => {
    setNodeAfeild("경제");
    setNodeBfeild("경제");
    setDirection(0);
    setNodeA("");
    setNodeB("");
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    console.log(toggle);
    console.log(!toggle);
    setToggle(!toggle)
  };

  const handleRemoveNode = (e, currentData) => {
    e.stopPropagation();
    if (window.confirm('정말 삭제할거야?')) {
      axios.delete('/api/neo4j/delete', { data: currentData })
        .then(({ data: deleted }) => {
          const updatedList = currentNodes.filter((each) =>  (each.properties.node !== deleted.node));
          setCurrentNodes(updatedList);
        })
    }
  };

  const handleConnectStart = () => {
    if (connectStart === true) {
      setNodeBox([]);
    }
    setConnectStart(!connectStart);
  };
  
  const handleNodeBox = (currentData) => {
    if (nodeBox.length === 2) {
      alert('다 찼습니다.');
      return;
    }
    if (nodeBox.includes(currentData)) {
      alert('이미 있다.');
      return;
    }
    setNodeBox([...nodeBox, currentData]);
  };

  return (
    <Container>
      <Title>
        <h2>SYETEM MAP</h2>
      </Title>
      <Contents>
        <Forms left>
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
            <StyledButton type="submit" bg="skyblue" fontColor="black">추가</StyledButton>
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
            <StyledButton type="submit" bg="skyblue" fontColor="black">연결</StyledButton>
          </StyledForm>
          <FlexButtonContainer>
            <StyledButton bg="red" fontColor="white" onClick={handleToggle}>{ toggle ? '노드삭제취소': '노드삭제'}</StyledButton>
          </FlexButtonContainer>
        </Forms>
        <NodesContainer>
          {/* {currentNodes && (
            currentNodes.map((eactData, i) => {
              return (
                <Node
                  id={eactData.identity}
                  value={eactData.identity} 
                  onClick={() => connectStart && handleNodeBox(eactData)}
                >    
                  {toggle && (
                    <StyledButton
                      bg="red"
                      fontColor="white"
                      onClick={(e) => handleRemoveNode(e, eactData)}
                    >
                      삭제
                    </StyledButton>
                  )}          
                  {eactData.labels.map((label) => <>{label}</>)}
                  <div>
                    {eactData.properties.node}
                  </div>
                </Node>
              )
            })
          )} */}
          {(currentNodes && currentEdges) ? (
            <VisGraph
              currentNodes={currentNodes}
              currentEdges={currentEdges}
            />
          ) : (
            'Loading'
          )}
        </NodesContainer>
        <Forms right>
          <FlexButtonContainer>
            <h2>변수 연결</h2>
            <StyledButton onClick={handleConnectStart} bg="skyblue" fontColor="black">{connectStart ? '연결취소' : '연결하기'}</StyledButton>
          </FlexButtonContainer>
          <StyledForm
            method="post"
            onSubmit={handleVariableClick}
          >
            <div>
              {nodeBox.map(((eachNode, i) => (
                <div>
                  <div>{i + 1}</div>
                  <div>분야: {eachNode.properties.feild}</div>
                  <div>변수: {eachNode.properties.node}</div>
                </div>
              )))}
            </div>
            {nodeBox.length === 2 && (
              <StyledLabel style={{ marginTop: '0.5rem'}}>
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
            )}
            {connectStart && <StyledButton type="submit" bg="skyblue" fontColor="black" style={{marginTop: '0.5rem'}}>연결</StyledButton>}
          </StyledForm>
        </Forms>
      </Contents>
    </Container>
  );
}

export default SystemMap;
