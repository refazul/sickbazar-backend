module.exports = {
    CategoryMutations: {
        createCategory: async (_, { input }, { dataSources }) => {
            const category = await dataSources.categoryAPI.createCategory(input);
            return {
                success: category ? "yes" : "no",
                message: category ? 'category created successfully' : 'error creating category'
            };
        },
        updateCategory: async (_, { categoryID, input }, { dataSources }) => {
            const category = await dataSources.categoryAPI.updateCategory(categoryID, input);
            return {
                success: category ? "yes" : "no",
                message: category ? 'category updated successfully' : 'error updating category'
            };
        },
        deleteCategory: async (_, { categoryID }, { dataSources }) => {
            const response = await dataSources.categoryAPI.deleteCategory(categoryID);
            return {
                success: response ? "yes" : "no",
                message: response ? `${response.deletedCount} category(s) deleted successfully` : 'error deleting category'
            };
        },
    },
    CategoryQueries: {
        readCategory: async (_, { categoryID }, { dataSources }) => {
            const category = await dataSources.categoryAPI.readCategory(categoryID);
            return category;
        },
        readCategories: async (_, { title }, { dataSources }) => {
            const categories = await dataSources.categoryAPI.readCategories(title);
            return categories;
        }
    }
}