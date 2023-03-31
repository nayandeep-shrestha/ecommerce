const mongoose = require('mongoose')
const CommonSchema = {
    created_by:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null
    },
    status:{
        type: String,
        enum:['active','inactive'],
        default: 'inactive'
    }
}

module.exports= CommonSchema