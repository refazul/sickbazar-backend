function object_match(obj1, obj2) {
    for (var i in obj1) {
        if (!obj2[i] || obj1[i] != obj2[i]) {
            return false;
        }
    }
    return true;
}

module.exports = {
    ProductMutations: {
        createProduct: async (_, { input }, { dataSources }) => {
            return await dataSources.productAPI.createEntity(input);
        },
        updateProduct: async (_, { entityID, input }, { dataSources }) => {
            return await dataSources.productAPI.updateEntity(entityID, input);
        },
        deleteProduct: async (_, { entityID }, { dataSources }) => {
            const response = await dataSources.productAPI.deleteEntity(entityID);
            return entityID;
        },
    },
    ProductQueries: {
        readProduct: async (_, { entityID }, { dataSources }) => {
            const product = await dataSources.productAPI.readEntity(entityID);
            const group = await dataSources.groupAPI.readEntity(product.groupID);
            product.group = group;
            return product;
        },
        readProducts: async (_, { title }, { dataSources }) => {
            return await dataSources.productAPI.readEntities(title);
        }
    }
}