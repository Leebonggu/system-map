const router = require('express').Router();
const neo4j = require('./neo4j');

router.use('/neo4j', neo4j);

module.exports = router;
