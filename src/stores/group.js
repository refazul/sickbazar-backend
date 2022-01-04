const mongoose = require('mongoose');

GroupSchema = mongoose.model('Group', {
    title: String,
    description: String,
    image: String
});

module.exports = {
    createGroup: async (input) => {
        const { title } = input;
        var group = await GroupSchema.findOne({ title }).exec();
        if (!group) {
            var newGroup = new GroupSchema(input);
            group = await newGroup.save();
        } else {
            group = await GroupSchema.findByIdAndUpdate(group.id, input).exec();
        }
        return group;
    },
    readGroup: async (id) => {
        const group = await GroupSchema.findById(id).exec();
        return group;
    },
    readGroups: async (title) => {
        const regexp = new RegExp(`${title}`, "gi");
        const groups = await GroupSchema.find({ title: regexp, }, 'title description', { skip: 0, limit: 5 }).exec();
        //const group = await GroupSchema.find({ name: /john/i, age: { $gte: 18 } }, 'title description', { skip: 10, limit: 5 }).exec();
        return groups;
    },
    updateGroup: async (id, input) => {
        var group = await GroupSchema.findByIdAndUpdate(id, input).exec();
        return group;
    },
    deleteGroup: async (id) => {
        var resoponse = await GroupSchema.findByIdAndDelete(id).remove().exec();
        return resoponse;
    }
}