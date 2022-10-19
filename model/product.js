const {Schema,model} = require('mongoose');

const product = new Schema({
    title: {
        type: String,
        require: true,
    },
    menu: {
        type: Schema.Types.ObjectId,
        ref: "Menu",
    },
    author: String,
    desc: String,
    hot: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        default: 0,
    },
    status: {
        type: Number,
        default: 0,
    },
    text: {
        type: String,
        default: "",
    },
    photos: [String],
    rate: [
        {
        name: String,
        rate: Number,
        text: String,
        createdAt: Date,
        },
    ],
});



module.exports = model('Product',product)