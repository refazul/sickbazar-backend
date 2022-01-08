const { ProductMutations, ProductQueries } = require('./resolvers/product')
const { GroupMutations, GroupQueries } = require('./resolvers/group')
const { CategoryMutations, CategoryQueries } = require('./resolvers/category')

module.exports = {
    Query: {
        ...ProductQueries,
        ...GroupQueries,
        ...CategoryQueries
    },
    Mutation: {
        ...ProductMutations,
        ...GroupMutations,
        ...CategoryMutations
    },
};