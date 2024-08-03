//Your Neo4j code goes here

// create family members (8)
CREATE (a:Person {name: "A Doe", born: 1990})
CREATE (b:Person {name: "B Doe", born: 1991})
CREATE (c:Person {name: "C Doe", born: 1992})
CREATE (d:Person {name: "D Doe", born: 1993})
CREATE (y:Person {name: "Y Doe", born: 1970})
CREATE (z:Person {name: "Z Doe", born: 1970})
CREATE (g:Person {name: "G Doe", born: 2017})
CREATE (h:Person {name: "H Doe", born: 2020})


// create spouse relationships
CREATE (a)-[:SPOUSE {married: 2017}]->(b)
CREATE (b)-[:SPOUSE {married: 2017}]->(a)

// create child relationships
CREATE (g)-[:CHILD {type: "daughter"}]->(a)
CREATE (g)-[:CHILD {type: "daughter"}]->(b)
CREATE (h)-[:CHILD {type: "son"}]->(a)
CREATE (h)-[:CHILD {type: "son"}]->(b)

// create parent relationships
CREATE (a)-[:PARENT {type: "father"}]->(g)
CREATE (b)-[:PARENT {type: "mother"}]->(g)
CREATE (a)-[:PARENT {type: "father"}]->(h)
CREATE (b)-[:PARENT {type: "mother"}]->(h)

// create other relationships
CREATE (c)-[:RELATIVE {type: "aunt"}]->(g)
CREATE (c)-[:RELATIVE {type: "aunt"}]->(h)
CREATE (d)-[:RELATIVE {type: "uncle"}]->(g)
CREATE (d)-[:RELATIVE {type: "uncle"}]->(h)

CREATE (y)-[:PARENT {type: "father"}]->(a)
CREATE (z)-[:PARENT {type: "mother"}]->(a)
;
