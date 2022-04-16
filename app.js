const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

const app = express();

app.get('/', (req, res) => {
    res.send('Hello GraphQL');
});

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
}));

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
