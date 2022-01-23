const mongoose = require('mongoose');

class Entity {
    constructor({ EntitySchema }) {
        this.EntitySchema = EntitySchema;
    }
    async createEntity(input) {
        const { title } = input;
        var object = await this.EntitySchema.findOne({ title }).exec();
        if (!object) {
            var newEntity = new this.EntitySchema(input);
            object = await newEntity.save();
        } else {
            object = await this.EntitySchema.findByIdAndUpdate(object.id, input, { new: true }).exec();
        }
        return object;
    }
    async readEntity(id) {
        return await this.EntitySchema.findById(id).exec();
    }
    async readEntities(title) {
        const regexp = new RegExp(`${title}`, "gi");
        return await this.EntitySchema.find({ title: regexp, }, '', { skip: 0, limit: 20 }).exec();
        //const category = await EntitySchema.find({ name: /john/i, age: { $gte: 18 } }, 'title description', { skip: 10, limit: 5 }).exec();
    }
    async updateEntity(id, input) {
        return await this.EntitySchema.findByIdAndUpdate(id, input, { new: true }).exec();
    }
    async deleteEntity(id) {
        return await this.EntitySchema.findByIdAndDelete(id).remove().exec();
    }
}

module.exports.createStore = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://' + process.env.db_user_mongodb + ':' + process.env.db_pass_mongodb + '@' + process.env.db_host + ':' + process.env.db_port_mongodb + '/' + process.env.db_name_mongodb + '?authSource=admin&readPreference=primary&directConnection=true&ssl=false', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    VendorSchema = mongoose.model('Vendor', {
        title: String,
        description: String,
        image: String
    });
    GroupSchema = mongoose.model('Group', {
        title: String,
        description: String,
        image: String
    });
    CategorySchema = mongoose.model('Category', {
        title: String,
        description: String,
        image: String
    });
    ProductSchema = mongoose.model('Product', {
        title: String,
        description: String,
        image: String,
        groupID: String,
        categoryIDs: [String],
        price: [{
            selector: [{
                name: String,
                value: String
            }],
            vendors: [{
                vendorID: String,
                price: Number,
                quantity: Number,
                sku: String,
                image: String,
                unit: String
            }]
        }]
    });
    AttributeSchema = mongoose.model('Attribute', {
        title: String,
        name: String,
        description: String,
        image: String,
        groupID: String,
        type: { type: String, enum: ['color', 'text', 'image'], default: 'text' },
        options: [{
            color: String,
            text: String,
            image: String
        }]
    });

    const VendorStore = new Entity({ EntitySchema: VendorSchema });
    const GroupStore = new Entity({ EntitySchema: GroupSchema });
    const CategoryStore = new Entity({ EntitySchema: CategorySchema });
    const ProductStore = new Entity({ EntitySchema: ProductSchema });
    const AttributeStore = new Entity({ EntitySchema: AttributeSchema });

    return { VendorStore, GroupStore, CategoryStore, ProductStore, AttributeStore }
}