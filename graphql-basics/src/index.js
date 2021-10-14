import {GraphQLServer} from 'graphql-yoga';

//Type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!,
        name: String!,
        location: String!,
        bio: String!,
    }
`;

//Resolvers
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        name () {
            return 'Ekip Kalir';
        },
        location: () => 'Bristol',
        bio: () => 'I am a software engineer',
    }
};  //end of resolvers


const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('Server is running on localhost:4000');
});


