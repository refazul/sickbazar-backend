module.exports = {
    CategoryMutations: {
        createCategory: async (_, { input }, { dataSources }) => {
            const category = await dataSources.categoryAPI.createEntity(input);
            return {
                success: category ? "yes" : "no",
                message: category ? 'category created successfully' : 'error creating category'
            };
        },
        updateCategory: async (_, { entityID, input }, { dataSources }) => {
            const category = await dataSources.categoryAPI.updateEntity(entityID, input);
            return {
                success: category ? "yes" : "no",
                message: category ? 'category updated successfully' : 'error updating category'
            };
        },
        deleteCategory: async (_, { entityID }, { dataSources }) => {
            const response = await dataSources.categoryAPI.deleteEntity(entityID);
            return {
                success: response ? "yes" : "no",
                message: response ? `${response.deletedCount} category(s) deleted successfully` : 'error deleting category'
            };
        },
    },
    CategoryQueries: {
        readCategory: async (_, { entityID }, { dataSources }) => {
            const category = await dataSources.categoryAPI.readEntity(entityID);
            return category;
        },
        readCategories: async (_, { title }, { dataSources }) => {
            const categories = await dataSources.categoryAPI.readEntities(title);
            return categories;
        }
    }
}