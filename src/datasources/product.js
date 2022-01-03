const { DataSource } = require('apollo-datasource');

class ProductAPI extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }
    async createProduct(input) {
        const product = await this.store.Product.createProduct(input);
        return product;
    }
    async readProduct(id) {
        const product = await this.store.Product.readProduct(id);
        return product;
    }
    async readProducts(title) {
        const products = await this.store.Product.readProducts(title);
        return products;
    }
    async updateProduct(id, input) {
        const product = await this.store.Product.updateProduct(id, input);
        return product;
    }
    async deleteProduct(id) {
        const response = await this.store.Product.deleteProduct(id);
        return response;
    }
}

module.exports = ProductAPI;
