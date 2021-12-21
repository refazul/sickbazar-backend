const mongoose = require('mongoose');

UserSchema = mongoose.model('User', {
    email: String,
    token: String
});
module.exports = {
    findOrCreate: async ({ email }) => {
        var user = await UserSchema.findOne({ email }).exec();
        if (!user) {
            var newUser = new UserSchema({ email });
            user = await newUser.save();
        }
        return [user];
    },
}