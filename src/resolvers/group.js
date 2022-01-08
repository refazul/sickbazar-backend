module.exports = {
    GroupMutations: {
        createGroup: async (_, { input }, { dataSources }) => {
            const group = await dataSources.groupAPI.createEntity(input);
            return {
                success: group ? "yes" : "no",
                message: group ? 'group created successfully' : 'error creating group'
            };
        },
        updateGroup: async (_, { entityID, input }, { dataSources }) => {
            const group = await dataSources.groupAPI.updateEntity(entityID, input);
            return {
                success: group ? "yes" : "no",
                message: group ? 'group updated successfully' : 'error updating group'
            };
        },
        deleteGroup: async (_, { entityID }, { dataSources }) => {
            const response = await dataSources.groupAPI.deleteEntity(entityID);
            return {
                success: response ? "yes" : "no",
                message: response ? `${response.deletedCount} group(s) deleted successfully` : 'error deleting group'
            };
        },
    },
    GroupQueries: {
        readGroup: async (_, { entityID }, { dataSources }) => {
            const group = await dataSources.groupAPI.readEntity(entityID);
            return group;
        },
        readGroups: async (_, { title }, { dataSources }) => {
            const groups = await dataSources.groupAPI.readEntities(title);
            return groups;
        }
    }
}