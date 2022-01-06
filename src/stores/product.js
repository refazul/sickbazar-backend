const mongoose = require('mongoose');

ProductSchema = mongoose.model('Product', {
    title: String,
    description: String,
    image: String,
    groupID: String,
});

module.exports = {
    createProduct: async (input) => {
        const { title } = input;
        var product = await ProductSchema.findOne({ title }).exec();
        if (!product) {
            var newProduct = new ProductSchema(input);
            product = await newProduct.save();
        } else {
            product = await ProductSchema.findByIdAndUpdate(product.id, input).exec();
        }
        return product;
    },
    readProduct: async (id) => {
        const product = await ProductSchema.findById(id).exec();
        return product;
    },
    readProducts: async (title) => {
        const regexp = new RegExp(`${title}`, "gi");
        const products = await ProductSchema.find({ title: regexp, }, '', { skip: 0, limit: 5 }).exec();
        //const product = await ProductSchema.find({ name: /john/i, age: { $gte: 18 } }, 'title description', { skip: 10, limit: 5 }).exec();
        return products;
    },
    updateProduct: async (id, input) => {
        var product = await ProductSchema.findByIdAndUpdate(id, input).exec();
        return product;
    },
    deleteProduct: async (id) => {
        var resoponse = await ProductSchema.findByIdAndDelete(id).remove().exec();
        return resoponse;
    }
}