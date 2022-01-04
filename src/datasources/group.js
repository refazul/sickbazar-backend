const { DataSource } = require('apollo-datasource');

class GroupAPI extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }
    async createGroup(input) {
        const group = await this.store.Group.createGroup(input);
        return group;
    }
    async readGroup(id) {
        const group = await this.store.Group.readGroup(id);
        return group;
    }
    async readGroups(title) {
        const groups = await this.store.Group.readGroups(title);
        return groups;
    }
    async updateGroup(id, input) {
        const group = await this.store.Group.updateGroup(id, input);
        return group;
    }
    async deleteGroup(id) {
        const response = await this.store.Group.deleteGroup(id);
        return response;
    }
}

module.exports = GroupAPI;
