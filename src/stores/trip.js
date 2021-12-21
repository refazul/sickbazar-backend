const mongoose = require('mongoose');

TripSchema = mongoose.model('Trip', {
    launchId: Number,
    userId: String
})

module.exports = {
    findOrCreate: async ({ userId, launchId }) => {
        var trip = await TripSchema.findOne({ userId, launchId }).exec();
        if (!trip) {
            var newTrip = new TripSchema({ userId, launchId });
            trip = await newTrip.save();
        }
        return [trip];
    },
    findAll: async ({ userId }) => {
        var res = await TripSchema.find({ userId }).exec();
        return res;
    },
    destroy: async ({ userId, launchId }) => {
        var res = await TripSchema.remove({ userId, launchId }).exec();
        return res.deletedCount > 0;
    }
}