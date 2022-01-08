module.exports = {
    CategoryMutations: {
        createCategory: async (_, { input }, { dataSources }) => {
            const category = await dataSources.categoryAPI.createEntity(input);
            return {
                success: category ? "yes" : "no",
                message: category ? 'category created successfully' : 'error creating category'
            };
        },
        updateCategory: async (_, { categoryID, input }, { dataSources }) => {
            const category = await dataSources.categoryAPI.updateEntity(categoryID, input);
            return {
                success: category ? "yes" : "no",
                message: category ? 'category updated successfully' : 'error updating category'
            };
        },
        deleteCategory: async (_, { categoryID }, { dataSources }) => {
            const response = await dataSources.categoryAPI.deleteEntity(categoryID);
            return {
                success: response ? "yes" : "no",
                message: response ? `${response.deletedCount} category(s) deleted successfully` : 'error deleting category'
            };
        },
    },
    CategoryQueries: {
        readCategory: async (_, { categoryID }, { dataSources }) => {
            const category = await dataSources.categoryAPI.readEntity(categoryID);
            return category;
        },
        readCategories: async (_, { title }, { dataSources }) => {
            const categories = await dataSources.categoryAPI.readEntities(title);
            return categories;
        }
    }
}