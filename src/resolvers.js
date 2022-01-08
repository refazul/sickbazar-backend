const { VendorMutations, VendorQueries } = require('./resolvers/vendor')
const { GroupMutations, GroupQueries } = require('./resolvers/group')
const { CategoryMutations, CategoryQueries } = require('./resolvers/category')
const { ProductMutations, ProductQueries } = require('./resolvers/product')

module.exports = {
    Query: {
        ...VendorQueries,
        ...ProductQueries,
        ...GroupQueries,
        ...CategoryQueries
    },
    Mutation: {
        ...VendorMutations,
        ...ProductMutations,
        ...GroupMutations,
        ...CategoryMutations
    },
};