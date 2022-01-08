function object_match(obj1, obj2) {
    for (var i in obj1) {
        if (!obj2[i] || obj1[i] != obj2[i]) {
            return false;
        }
    }
    return true;
}

module.exports = {
    ProductMutations: {
        createProduct: async (_, { input }, { dataSources }) => {
            const product = await dataSources.productAPI.createEntity(input);
            return {
                success: product ? "yes" : "no",
                message: product ? 'product created successfully' : 'error creating product'
            };
        },
        updateProduct: async (_, { entityID, input }, { dataSources }) => {
            const product = await dataSources.productAPI.updateEntity(entityID, input);
            return {
                success: product ? "yes" : "no",
                message: product ? 'product updated successfully' : 'error updating product'
            };
        },
        deleteProduct: async (_, { entityID }, { dataSources }) => {
            const response = await dataSources.productAPI.deleteEntity(entityID);
            return {
                success: response ? "yes" : "no",
                message: response ? `${response.deletedCount} product(s) deleted successfully` : 'error deleting product'
            };
        },
        addStock: async (_, { entityID, selector, stock }, { dataSources }) => {
            const product = await dataSources.productAPI.readEntity(entityID);
            product.price.push({ selector, stock })
            const response = await product.save();
            return {
                success: response ? "yes" : "no",
                object: response
            };
        },
        reduceStock: async (_, { entityID, selector, reduceObj }, { dataSources }) => {
            const product = await dataSources.productAPI.readEntity(entityID);

            const new_stock = product.price.map((p) => {
                if (object_match(p.selector, selector)) {
                    const quantity_match = p.stock.quantity > 0 && p.stock.quantity >= reduceObj.quantity;
                    const vendor_match = p.stock.vendorID == reduceObj.vendorID
                    if (quantity_match && vendor_match) {
                        p.stock.quantity -= reduceObj.quantity;
                    }
                }
                return p;
            });
            const response = await dataSources.productAPI.updateEntity(entityID, { price: new_stock } );
            return {
                success: response ? "yes" : "no",
                object: response
            };
        },
    },
    ProductQueries: {
        readProduct: async (_, { entityID }, { dataSources }) => {
            const product = await dataSources.productAPI.readEntity(entityID);
            const group = await dataSources.groupAPI.readEntity(product.groupID);
            product.group = group;
            return product;
        },
        readProducts: async (_, { title }, { dataSources }) => {
            const products = await dataSources.productAPI.readEntities(title);
            return products;
        }
    }
}