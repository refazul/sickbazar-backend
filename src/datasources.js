const { DataSource } = require('apollo-datasource');

class EntityAPI extends DataSource {
    constructor({ EntityStore }) {
        super();
        this.store = EntityStore;
    }
    async createEntity(input) {
        return await this.store.createEntity(input);
    }
    async readEntity(id) {
        return await this.store.readEntity(id);
    }
    async readEntities(title) {
        return await this.store.readEntities(title);
    }
    async updateEntity(id, input) {
        return await this.store.updateEntity(id, input);
    }
    async deleteEntity(id) {
        return await this.store.deleteEntity(id);
    }
}

module.exports = {
    EntityAPI
}