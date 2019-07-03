import 'source-map-support/register';
import {ApolloServer, gql} from 'apollo-server-lambda';

const typeDefs = gql`
    type Query{
        hello: String
    }
`;

const resolvers = {
    query: {
        hello() {
            return 'Hello World!'
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

export const graphqlHandler = server.createHandler();
