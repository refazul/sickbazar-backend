module.exports = {
    GroupMutations: {
        createGroup: async (_, { input }, { dataSources }) => {
            return await dataSources.groupAPI.createEntity(input);
        },
        updateGroup: async (_, { entityID, input }, { dataSources }) => {
            return await dataSources.groupAPI.updateEntity(entityID, input);
        },
        deleteGroup: async (_, { entityID }, { dataSources }) => {
            const response = await dataSources.groupAPI.deleteEntity(entityID);
            return entityID;
        },
    },
    GroupQueries: {
        readGroup: async (_, { entityID }, { dataSources }) => {
            return await dataSources.groupAPI.readEntity(entityID);
        },
        readGroups: async (_, { title }, { dataSources }) => {
            return await dataSources.groupAPI.readEntities(title);
        }
    }
}