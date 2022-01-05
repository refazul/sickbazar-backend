const { DataSource } = require('apollo-datasource');

class CategoryAPI extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }
    async createCategory(input) {
        const category = await this.store.Category.createCategory(input);
        return category;
    }
    async readCategory(id) {
        const category = await this.store.Category.readCategory(id);
        return category;
    }
    async readCategories(title) {
        const categories = await this.store.Category.readCategories(title);
        return categories;
    }
    async updateCategory(id, input) {
        const category = await this.store.Category.updateCategory(id, input);
        return category;
    }
    async deleteCategory(id) {
        const response = await this.store.Category.deleteCategory(id);
        return response;
    }
}

module.exports = CategoryAPI;
