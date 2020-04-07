// https://www.youtube.com/watch?v=1kyPUqU-MkE
// https://www.youtube.com/watch?v=snjnJCZhXUM&t=8s

// MATCH (n)
// DETACH DELETE n

// 중요도
// isDirect: 
// isDelay

const router = require('express').Router();
const neo4j = require('neo4j-driver');

const driver = new neo4j.driver('bolt://localhost:7687', neo4j.auth.basic("neo4j", "1234"), { disableLosslessIntegers: true });

router.get('/all', (req, res) => {
  const session = driver.session();
  session
    .run(`MATCH(n) return n LIMIT 35`)
    .then((result) => {
      // records._fields
      // identity => id
      // labels => 대주제? 혹은 소주제 정도가 되겠는데, 근데 배열인 걸로 보면 여러개의 라벨을 가질 수 있겠어.
      // properties => 실질적인 값이 들어있어.
      // result.records.forEach((record) => console.log(record._fields[0].properties))
      console.log(result.records[0]._fields);
      const data = [];
      result.records.forEach(record => {
        console.log('record', record);
        console.log('record_field', record._fields)
        data.push(record._fields[0]);
      })
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    })
});
router.post('/add', (req, res) => {
  const session = driver.session();
  const { node, feild } = req.body;
  session
    .run(`CREATE(n:${feild} {node: {nodeParam}, feild: {feildParam}}) RETURN n.node`, { nodeParam: node, feildParam: feild })
    .then((result) => {
      console.log(result.records);
      session.close();
      res.send('success');
    })
    .catch(err => {
      console.log(err);
    })
});

router.post('/connection', (req, res) => {
  const session = driver.session();
  const { 
    nodeA,
    nodeB,
    nodeAfield,
    nodeBfield,
    direction
  } = req.body;
  session
    .run(
      `MATCH(a:${nodeAfield} {node: {nodeAParam}}),(b:${nodeBfield}{node: {nodeBParam}}) MERGE(a)-[r:${direction}]-(b) RETURN a,b`,
      {nodeAParam: nodeA, nodeBParam: nodeB })
    .then(() => {
      session.close();
      res.send('success')
    })
    .catch(err => {
      console.log(err);
    });
})

module.exports = router;
