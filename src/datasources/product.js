const { DataSource } = require('apollo-datasource');

class ProductAPI extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }
    async createProduct({ name, description }) {
        const product = await this.store.Product.createProduct({ name, description });
        return product;
    }
    async updateProduct(id, { name, description }) {
        const product = await this.store.Product.updateProduct(id, { name, description });
        return product;
    }
    async deleteProduct(id) {
        const response = await this.store.Product.deleteProduct(id);
        return response;
    }
}

module.exports = ProductAPI;
