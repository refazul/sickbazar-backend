module.exports = {
    ProductMutations: {
        createProduct: async (_, { input }, { dataSources }) => {
            const product = await dataSources.productAPI.createProduct({ title, description, groupID } = input);
            return {
                success: product ? "yes" : "no",
                message: product ? 'product created successfully' : 'error creating product'
            };
        },
        updateProduct: async (_, { productID, input }, { dataSources }) => {
            const product = await dataSources.productAPI.updateProduct(productID, { title, description, groupID } = input);
            return {
                success: product ? "yes" : "no",
                message: product ? 'product updated successfully' : 'error updating product'
            };
        },
        deleteProduct: async (_, { productID }, { dataSources }) => {
            const response = await dataSources.productAPI.deleteProduct(productID);
            return {
                success: response ? "yes" : "no",
                message: response ? `${response.deletedCount} product(s) deleted successfully` : 'error deleting product'
            };
        },
    },
    ProductQueries: {

    }
}