# System map

시스템맵을 만들고있는데요. 이제 리액트와 익스프레스, 네오4제이를 곁들인...

관계까지 찾아냈다. 이제, visjs를 사용해봐도 될듯함.

## Docker Setting

```
docker run \
    --name testneo4j \
    -p7474:7474 -p7687:7687 \
    -d \
    -v $HOME/neo4j/data:/data \
    -v $HOME/neo4j/logs:/logs \
    -v $HOME/neo4j/import:/var/lib/neo4j/import \
    -v $HOME/neo4j/plugins:/plugins \
    --env NEO4J_AUTH=neo4j/test \
    neo4j:3.5.12
```