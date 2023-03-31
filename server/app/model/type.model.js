const mongoose = require("mongoose")
const CommonSchema = require("./common.model")
const TypeSchemaDef = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true,
    },
    link:{
        type: String,
        default: null
    },
    type:{
        type: String,
        enum: ['brand', 'banner'],
        required: true,
        default: 'brand'
    },
    created_by: CommonSchema.created_by,
    status: CommonSchema.status
},{
    timestamps: true,
    autoCreate:true,
    autoIndex:true
})
const TypeModel = mongoose.model('Type', TypeSchemaDef)
module.exports = TypeModel