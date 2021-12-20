const mongoose = require('mongoose');

module.exports.paginateResults = ({
    after: cursor,
    pageSize = 20,
    results,
    // can pass in a function to calculate an item's cursor
    getCursor = () => null,
}) => {
    if (pageSize < 1) return [];

    if (!cursor) return results.slice(0, pageSize);
    const cursorIndex = results.findIndex(item => {
        // if an item has a `cursor` on it, use that, otherwise try to generate one
        let itemCursor = item.cursor ? item.cursor : getCursor(item);

        // if there's still not a cursor, return false by default
        return itemCursor ? cursor === itemCursor : false;
    });

    return cursorIndex >= 0
        ? cursorIndex === results.length - 1 // don't let us overflow
            ? []
            : results.slice(
                cursorIndex + 1,
                Math.min(results.length, cursorIndex + 1 + pageSize),
            )
        : results.slice(0, pageSize);
};

module.exports.createStore = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://' + process.env.db_user_mongodb + ':' + process.env.db_pass_mongodb + '@' + process.env.db_host + ':' + process.env.db_port_mongodb + '/' + process.env.db_name_mongodb + '?authSource=admin&readPreference=primary&directConnection=true&ssl=false', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    UserSchema = mongoose.model('User', {
        email: String,
        token: String
    });
    TripSchema = mongoose.model('Trip', {
        launchId: Number,
        userId: String
    })
    ProductSchema = mongoose.model('Product', {
        name: String,
        description: String
    });

    const User = {
        findOrCreate: async ({ email }) => {
            var user = await UserSchema.findOne({ email }).exec();
            if (!user) {
                var newUser = new UserSchema({ email });
                user = await newUser.save();
            }
            return [user];
        },
    }
    const Trip = {
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
    const Product = {
        createProduct: async ({ name, description }) => {
            var product = await ProductSchema.findOne({ name }).exec();
            if (!product) {
                var newProduct = new ProductSchema({ name, description });
                product = await newProduct.save();
            }
            return product;
        },
        updateProduct: async (id, { name, description }) => {
            var product = await ProductSchema.findOneAndUpdate({ id }, { name, description }).exec();
            return product;
        },
        deleteProduct: async (id) => {
            var resoponse = await ProductSchema.findOne({ id }).remove().exec();
            return resoponse;
        }
    }

    return { User, Trip, Product }
}