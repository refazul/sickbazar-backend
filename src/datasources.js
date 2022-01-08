const { DataSource } = require('apollo-datasource');

class EntityAPI extends DataSource {
    constructor({ EntityStore }) {
        super();
        this.store = EntityStore;
    }
    async createEntity(input) {
        const category = await this.store.createEntity(input);
        return category;
    }
    async readEntity(id) {
        const category = await this.store.readEntity(id);
        return category;
    }
    async readEntities(title) {
        const categories = await this.store.readEntities(title);
        return categories;
    }
    async updateEntity(id, input) {
        const category = await this.store.updateEntity(id, input);
        return category;
    }
    async deleteEntity(id) {
        const response = await this.store.deleteEntity(id);
        return response;
    }
}

module.exports = {
    EntityAPI
}