module.exports = {
    AttributeMutations: {
        createAttribute: async (_, { input }, { dataSources }) => {
            return await dataSources.attributeAPI.createEntity(input);
        },
        updateAttribute: async (_, { entityID, input }, { dataSources }) => {
            return await dataSources.attributeAPI.updateEntity(entityID, input);
        },
        deleteAttribute: async (_, { entityID }, { dataSources }) => {
            const response = await dataSources.attributeAPI.deleteEntity(entityID);
            return entityID;
        },
        addOption: async (_, { entityID, option }, { dataSources }) => {
            const attribute = await dataSources.attributeAPI.readEntity(entityID);
            attribute.options.push(option);
            const response = await attribute.save();
            return {
                success: response ? "yes" : "no",
                object: response
            };
        },
    },
    AttributeQueries: {
        readAttribute: async (_, { entityID }, { dataSources }) => {
            return await dataSources.attributeAPI.readEntity(entityID);
        },
        readAttributes: async (_, { title }, { dataSources }) => {
            return await dataSources.attributeAPI.readEntities(title);
        }
    }
}