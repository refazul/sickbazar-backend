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
    updateProduct: async (id, { title, description, groupID }) => {
        var product = await ProductSchema.findByIdAndUpdate(id, { title, description, groupID }).exec();
        return product;
    },
    deleteProduct: async (id) => {
        var resoponse = await ProductSchema.findByIdAndDelete(id).remove().exec();
        return resoponse;
    }
}