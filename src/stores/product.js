const mongoose = require('mongoose');

ProductSchema = mongoose.model('Product', {
    title: String,
    description: String,
    groupID: String,
});

module.exports = {
    createProduct: async ({ title, description, groupID }) => {
        var product = await ProductSchema.findOne({ title }).exec();
        if (!product) {
            var newProduct = new ProductSchema({ title, description, groupID });
            product = await newProduct.save();
        } else {
            product = await ProductSchema.findByIdAndUpdate(product.id, { title, description, groupID }).exec();
        }
        return product;
    },
    readProduct: async (id) => {
        const product = await ProductSchema.findOne({ id }).exec();
        return product;
    },
    readProducts: async (title) => {
        const regexp = new RegExp(`${title}`, "gi");
        const products = await ProductSchema.find({ title: regexp, }, 'title description', { skip: 0, limit: 5 }).exec();
        //const product = await ProductSchema.find({ name: /john/i, age: { $gte: 18 } }, 'title description', { skip: 10, limit: 5 }).exec();
        return products;
    },
    updateProduct: async (id, { title, description, groupID }) => {
        var product = await ProductSchema.findByIdAndUpdate(id, { title, description, groupID }).exec();
        return product;
    },
    deleteProduct: async (id) => {
        var resoponse = await ProductSchema.findByIdAndDelete(id).remove().exec();
        return resoponse;
    }
}