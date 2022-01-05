const mongoose = require('mongoose');

CategorySchema = mongoose.model('Category', {
    title: String,
    description: String,
    image: String
});

module.exports = {
    createCategory: async (input) => {
        const { title } = input;
        var category = await CategorySchema.findOne({ title }).exec();
        if (!category) {
            var newCategory = new CategorySchema(input);
            category = await newCategory.save();
        } else {
            category = await CategorySchema.findByIdAndUpdate(category.id, input).exec();
        }
        return category;
    },
    readCategory: async (id) => {
        const category = await CategorySchema.findById(id).exec();
        return category;
    },
    readCategories: async (title) => {
        const regexp = new RegExp(`${title}`, "gi");
        const categories = await CategorySchema.find({ title: regexp, }, 'title description', { skip: 0, limit: 5 }).exec();
        //const category = await CategorySchema.find({ name: /john/i, age: { $gte: 18 } }, 'title description', { skip: 10, limit: 5 }).exec();
        return categories;
    },
    updateCategory: async (id, input) => {
        var category = await CategorySchema.findByIdAndUpdate(id, input).exec();
        return category;
    },
    deleteCategory: async (id) => {
        var resoponse = await CategorySchema.findByIdAndDelete(id).remove().exec();
        return resoponse;
    }
}