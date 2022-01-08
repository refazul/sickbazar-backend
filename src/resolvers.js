const { VendorMutations, VendorQueries } = require('./resolvers/vendor')
const { GroupMutations, GroupQueries } = require('./resolvers/group')
const { CategoryMutations, CategoryQueries } = require('./resolvers/category')
const { ProductMutations, ProductQueries } = require('./resolvers/product')
const { AttributeQueries, AttributeMutations } = require('./resolvers/attribute')

module.exports = {
    Query: {
        ...VendorQueries,
        ...ProductQueries,
        ...GroupQueries,
        ...CategoryQueries,
        ...AttributeQueries,
    },
    Mutation: {
        ...VendorMutations,
        ...ProductMutations,
        ...GroupMutations,
        ...CategoryMutations,
        ...AttributeMutations,
    },
};