module.exports = {
    AttributeMutations: {
        createAttribute: async (_, { input }, { dataSources }) => {
            const attribute = await dataSources.attributeAPI.createEntity(input);
            return {
                success: attribute ? "yes" : "no",
                message: attribute ? 'attribute created successfully' : 'error creating attribute'
            };
        },
        updateAttribute: async (_, { entityID, input }, { dataSources }) => {
            const attribute = await dataSources.attributeAPI.updateEntity(entityID, input);
            return {
                success: attribute ? "yes" : "no",
                message: attribute ? 'attribute updated successfully' : 'error updating attribute'
            };
        },
        deleteAttribute: async (_, { entityID }, { dataSources }) => {
            const response = await dataSources.attributeAPI.deleteEntity(entityID);
            return {
                success: response ? "yes" : "no",
                message: response ? `${response.deletedCount} attribute(s) deleted successfully` : 'error deleting attribute'
            };
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
            const attribute = await dataSources.attributeAPI.readEntity(entityID);
            return attribute;
        },
        readAttributes: async (_, { title }, { dataSources }) => {
            const attributes = await dataSources.attributeAPI.readEntities(title);
            return attributes;
        }
    }
}