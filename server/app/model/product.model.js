const { string } = require("joi")
const mongoose = require("mongoose")
const CommonSchema = require("./common.model")
const ProductSchemaDef = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        default: null
    },
    categories: [{
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null
    }],
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "Type",
        default: null
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    discount: {
        type: Number,
        min: 0,
        max: 100
    },
    actual_price: {
        type: Number,
        required: true
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    sku: {
        type: String,
    },
    stock: {
        type: Number,
        min: 0,

    },
    rating: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            raing: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    images: [{
        type: String,
        required: false,
    }],

    created_by: CommonSchema.created_by,
    status: CommonSchema.status
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})
const ProductModel = mongoose.model('Product', ProductSchemaDef)
module.exports = ProductModel