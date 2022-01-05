require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const isEmail = require('isemail');
const { createStore } = require('./store');
const resolvers = require('./resolvers');
const { LaunchAPI, ProductAPI, UserAPI, GroupAPI, CategoryAPI } = require('./datasources');

const store = createStore();

const server = new ApolloServer({
    context: async ({ req }) => {
        // simple auth check on every request
        const auth = req.headers && req.headers.authorization || '';
        const email = Buffer.from(auth, 'base64').toString('ascii');
        if (!isEmail.validate(email)) return { user: null };
        // find a user by their email
        const users = await store.User.findOrCreate({ email });
        const user = users && users[0] || null;
        return { user }
    },
    typeDefs,
    resolvers,
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        productAPI: new ProductAPI({ store }),
        userAPI: new UserAPI({ store }),
        groupAPI: new GroupAPI({ store }),
        categoryAPI: new CategoryAPI({ store }),
    })
});

server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/sandbox
    `);
});
