module.exports = {
    ProductMutations: {
        createProduct: async (_, { input }, { dataSources }) => {
            const product = await dataSources.productAPI.createEntity(input);
            return {
                success: product ? "yes" : "no",
                message: product ? 'product created successfully' : 'error creating product'
            };
        },
        updateProduct: async (_, { productID, input }, { dataSources }) => {
            const product = await dataSources.productAPI.updateEntity(productID, input);
            return {
                success: product ? "yes" : "no",
                message: product ? 'product updated successfully' : 'error updating product'
            };
        },
        deleteProduct: async (_, { productID }, { dataSources }) => {
            const response = await dataSources.productAPI.deleteEntity(productID);
            return {
                success: response ? "yes" : "no",
                message: response ? `${response.deletedCount} product(s) deleted successfully` : 'error deleting product'
            };
        },
    },
    ProductQueries: {
        readProduct: async (_, { productID }, { dataSources }) => {
            const product = await dataSources.productAPI.readEntity(productID);
            return product;
        },
        readProducts: async (_, { title }, { dataSources }) => {
            const products = await dataSources.productAPI.readEntities(title);
            return products;
        }
    }
}