const mongoose = require('mongoose');

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
            } else {
                product = await ProductSchema.findByIdAndUpdate(product.id, { name: name ? name : product.name, description: description ? description : product.description }).exec();
            }
            return product;
        },
        updateProduct: async (id, { name, description }) => {
            var product = await ProductSchema.findByIdAndUpdate(id, { name, description }).exec();
            return product;
        },
        deleteProduct: async (id) => {
            var resoponse = await ProductSchema.findByIdAndDelete(id).remove().exec();
            return resoponse;
        }
    }

    return { User, Trip, Product }
}