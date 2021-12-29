const { DataSource } = require('apollo-datasource');

class ProductAPI extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }
    async createProduct({ title, description, groupID }) {
        const product = await this.store.Product.createProduct({ title, description, groupID });
        return product;
    }
    async readProduct(id) {
        const product = await this.store.Product.readProduct(id);
        return product;
    }
    async updateProduct(id, { title, description, groupID }) {
        const product = await this.store.Product.updateProduct(id, { title, description, groupID });
        return product;
    }
    async deleteProduct(id) {
        const response = await this.store.Product.deleteProduct(id);
        return response;
    }
}

module.exports = ProductAPI;
