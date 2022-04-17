const graphql = require('graphql');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;


const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Docs for user',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        hobbies: { 
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return [{
                    id: 1,
                    name: 'Hobby 1',
                    description: 'Hobby 1 description',
                    userId: '1'
                },
                {
                    id: 2,
                    name: 'Hobby 2',
                    description: 'Hobby 2 description',
                    userId: '2'
                }]
            }
        },
    }),
});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Docs for hobby',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parentValue, args) {
                console.log(parentValue);
                return {
                    id: parentValue.userId,
                    name: 'John Doe',
                    age: 30,  
                }
            }
        }
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID }, name: {type: GraphQLString} },
            resolve(parent, args) {
                console.log("🚀 ~ file: schema.js ~ get ~ resolve ~ args", args)
                return {
                    id: '1',
                    name: 'John Doe',
                    age: 30,
                };
            }
        },
        Hobby: {
           type: HobbyType,
            args: { id: { type: GraphQLString }},
            resolve(parent, args) {
                return {
                    id: '1',
                    name: 'Hobby 1',
                    description: 'Hobby 1 description',
                    userId: '1',
                }
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return [{
                    id: '1',
                    name: 'John Doe',
                    age: 30,
                }, {
                    id: '2',
                    name: 'John Doe',
                    age: 32,
                }]
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parent, args) {
                console.log("🚀 ~ file: schema.js ~ create ~ resolve ~ args", args)
                return {
                    name: args.name,
                    age: args.age,
                }
            }
        },
        createHobby: {
            type: HobbyType,
            args: {
                name: { type: GraphQLString },
                description: { type: GraphQLString },
            },
            resolve(parent, args) {
                return {
                    name: args.name,
                    description: args.description,
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});
