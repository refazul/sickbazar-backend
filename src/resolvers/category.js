module.exports = {
    CategoryMutations: {
        createCategory: async (_, { input }, { dataSources }) => {
            return await dataSources.categoryAPI.createEntity(input);
        },
        updateCategory: async (_, { entityID, input }, { dataSources }) => {
            return await dataSources.categoryAPI.updateEntity(entityID, input);
        },
        deleteCategory: async (_, { entityID }, { dataSources }) => {
            const response = await dataSources.categoryAPI.deleteEntity(entityID);
            return entityID;
        },
    },
    CategoryQueries: {
        readCategory: async (_, { entityID }, { dataSources }) => {
            return await dataSources.categoryAPI.readEntity(entityID);
        },
        readCategories: async (_, { title }, { dataSources }) => {
            return await dataSources.categoryAPI.readEntities(title);
        }
    }
}