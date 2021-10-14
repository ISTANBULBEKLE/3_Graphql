import {GraphQLServer} from 'graphql-yoga';

//Scalar types: String, Int, Float, Boolean, ID

//Type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        salary: Float
    }
`;

//Resolvers
const resolvers = {
    Query: {
        id() {
            return 'ABC123';
        },
        name() {
            return 'Ekip Kalir';
        },
        age() {
            return 30;
        },
        employed() {
            return true;
        },
        salary() {
            return null;
        }

    }
};  //end of resolvers


const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('Server is running on localhost:4000');
});


