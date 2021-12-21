const mongoose = require('mongoose');
const User = require('./stores/user');
const Product = require('./stores/product');
const Group = require('./stores/group');
const Trip = require('./stores/trip');

module.exports.createStore = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://' + process.env.db_user_mongodb + ':' + process.env.db_pass_mongodb + '@' + process.env.db_host + ':' + process.env.db_port_mongodb + '/' + process.env.db_name_mongodb + '?authSource=admin&readPreference=primary&directConnection=true&ssl=false', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return { User, Trip, Product, Group }
}