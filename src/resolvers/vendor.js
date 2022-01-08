module.exports = {
    VendorMutations: {
        createVendor: async (_, { input }, { dataSources }) => {
            const vendor = await dataSources.vendorAPI.createEntity(input);
            return {
                success: vendor ? "yes" : "no",
                message: vendor ? 'vendor created successfully' : 'error creating vendor'
            };
        },
        updateVendor: async (_, { entityID, input }, { dataSources }) => {
            const vendor = await dataSources.vendorAPI.updateEntity(entityID, input);
            return {
                success: vendor ? "yes" : "no",
                message: vendor ? 'vendor updated successfully' : 'error updating vendor'
            };
        },
        deleteVendor: async (_, { entityID }, { dataSources }) => {
            const response = await dataSources.vendorAPI.deleteEntity(entityID);
            return {
                success: response ? "yes" : "no",
                message: response ? `${response.deletedCount} vendor(s) deleted successfully` : 'error deleting vendor'
            };
        },
    },
    VendorQueries: {
        readVendor: async (_, { entityID }, { dataSources }) => {
            const vendor = await dataSources.vendorAPI.readEntity(entityID);
            return vendor;
        },
        readVendors: async (_, { title }, { dataSources }) => {
            const vendors = await dataSources.vendorAPI.readEntities(title);
            return vendors;
        }
    }
}