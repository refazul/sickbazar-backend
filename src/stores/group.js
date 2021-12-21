const mongoose = require('mongoose');

GroupSchema = mongoose.model('Group', {
    title: String,
    description: String
});

module.exports = {
    createGroup: async ({ title, description }) => {
        var group = await GroupSchema.findOne({ title }).exec();
        if (!group) {
            var newGroup = new GroupSchema({ title, description });
            group = await newGroup.save();
        } else {
            group = await GroupSchema.findByIdAndUpdate(group.id, { title: title ? title : group.title, description: description ? description : group.description }).exec();
        }
        return group;
    },
    readGroup: async (id) => {
        const group = await GroupSchema.findOne({ id }).exec();
        return group;
    },
    updateGroup: async (id, { title, description }) => {
        var group = await GroupSchema.findByIdAndUpdate(id, { title, description }).exec();
        return group;
    },
    deleteGroup: async (id) => {
        var resoponse = await GroupSchema.findByIdAndDelete(id).remove().exec();
        return resoponse;
    }
}