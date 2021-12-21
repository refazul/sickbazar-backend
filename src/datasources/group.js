const { DataSource } = require('apollo-datasource');

class GroupAPI extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }
    async createGroup({ title, description }) {
        const group = await this.store.Group.createGroup({ title, description });
        return group;
    }
    async readGroup(id) {
        const group = await this.store.Group.readGroup(id);
        return group;
    }
    async updateGroup(id, { title, description }) {
        const group = await this.store.Group.updateGroup(id, { title, description });
        return group;
    }
    async deleteGroup(id) {
        const response = await this.store.Group.deleteGroup(id);
        return response;
    }
}

module.exports = GroupAPI;
