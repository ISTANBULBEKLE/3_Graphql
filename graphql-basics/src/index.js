import {GraphQLServer} from 'graphql-yoga';
import { v4 as uuidv4 } from 'uuid';

//Scalar types: String, Int, Float, Boolean, ID

//Type definitions (schema)

//Dummy Data

const users= [
    {
        id: '1',
        name: 'Mike',
        email: 'hdsh@jsdk',
        age:27
    },
    {
        id: '2',
        name: 'Jen',
        email: 'jdsh@jsdk'
    },
    {
        id: '3',
        name: 'Julie',
        email: 'jdsh@jsdk'
    }
]

const posts = [
    {
        id: '10',
        title: 'GraphQL 101',
        body: 'new article is begining ',
        published: true,
        author: '1'
    },
    {
        id: '11',
        title: 'GraphQL 201',
        body: 'you can select from ',
        published: false,
        author: '2'
    },
    {
        id: '12',
        title: 'GraphQL 301',
        body: 'you can select from ',
        published: true,
        author: '3'
    }
]

const comments =[
    {
        id: '101',
        text: 'this is a comment',
        author: '1',
    },
    {
        id: '102',
        text: 'this is b comment',
        author: '2',
    },

    {
        id: '103',
        text: 'this is c comment',
        author: '3',
    },
    {
        id: '104',
        text: 'this is d comment',
        author: '1',
    }
]


const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        users(qu:String): [User!]!
        posts(qu:String): [Post!]!
        me: User!
        post: Post!
        grades: [Int!]!
        add(numbers: [Int!]!): Int!
        comments: [Comment!]!
    }

    type Mutation{
        createUser(name: String!, email: String!, age: Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
        createComment(text: String!, author: ID!, post: ID!): Comment!
    }


    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }

    type Comment{
        id: ID!
        text: String!
        author: User!
    }
`;

//Resolvers
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info) {
            if(args.name && args.position) {
                return `Hello, ${args.name}! You are my favorite ${args.position}`;
            } else {
                return 'Hello!';
            }
        },

        users(parent, args, ctx, info) {
            if(!args.qu) {
                return users;
            } else {
                return users.filter(user => user.name.toLowerCase().includes(args.qu.toLowerCase()));
            }
            return users;
        },

        posts(parent, args, ctx, info) {
            if(!args.qu) {
                return posts;
            } 

            return posts.filter(post => {
                const isTitleMatch = post.title.toLowerCase().includes(args.qu.toLowerCase());
                const isBodyMatch = post.body.toLowerCase().includes(args.qu.toLowerCase());
               return isTitleMatch || isBodyMatch;
            })
        },

        me() {
            return {
                id: '123098',
                name: 'Mike',
                email: 'ekipkalir@gmail.com',
                age: 28,    
            }
        },

        post() {
            return {
                id: '092',
                title: 'GraphQL 101',
                body: '',
                published: false,
            }
        },

        grades(parent, args, ctx, info) {
            return [99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110];
        },

        add(parent, args, ctx, info) {
            if(args.numbers.length === 0) {
                return 0;
            } else {
                return args.numbers.reduce((acc, curr) => acc + curr);
            }
            //return args.numbers.reduce((acc, cur) => acc + cur, 0);
        },

        comments(parent, args, ctx, info) {
            return comments;
        }

    },

    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some(user => user.email === args.email);
            if(emailTaken) {
                throw new Error('Email taken');
            }

            const user = {
                id: uuidv4(),
                ...args
            }

            users.push(user);
            return user;
        },

        createPost(parent, args, ctx, info) {
            const userExists = users.some(user => user.id === args.author);
            if(!userExists) {
                throw new Error('User not found');
            }

            const post = {
                id: uuidv4(),
                ...args
            }

            posts.push(post);
            return post;
        },

        createComment(parent, args, ctx, info) {
            const userExists = users.some(user => user.id === args.author);
            const postExists = posts.some(post => post.id === args.post && post.published);

            if(!userExists || !postExists) {
                throw new Error('User or post not found');
            }

            const comment = {
                id: uuidv4(),
                ...args
            }

            comments.push(comment);
            return comment;

        }

    },


    Post: {
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author);
        }
    },  

    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(post => post.author === parent.id);
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.author === parent.id);
        }
    },   

    Comment: {
       author(parent, args, ctx, info) {
           return users.find(user => user.id === parent.author);
       }
    },   



};  //end of resolvers


const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('Server is running on localhost:4000');
});


