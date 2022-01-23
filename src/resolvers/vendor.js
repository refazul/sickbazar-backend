module.exports = {
    VendorMutations: {
        createVendor: async (_, { input }, { dataSources }) => {
            return await dataSources.vendorAPI.createEntity(input);
        },
        updateVendor: async (_, { entityID, input }, { dataSources }) => {
            return await dataSources.vendorAPI.updateEntity(entityID, input);
        },
        deleteVendor: async (_, { entityID }, { dataSources }) => {
            return await dataSources.vendorAPI.deleteEntity(entityID);
        },
    },
    VendorQueries: {
        readVendor: async (_, { entityID }, { dataSources }) => {
            return await dataSources.vendorAPI.readEntity(entityID);
        },
        readVendors: async (_, { title }, { dataSources }) => {
            return await dataSources.vendorAPI.readEntities(title);
        }
    }
}