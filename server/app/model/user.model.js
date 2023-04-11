const mongoose =require("mongoose")
const UserSchemaDef = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        requried: true,
        unique: true
    },
    mobile:{
        type: Number,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    image: String,
    role:{
        type: String,
        required: true,
        enum: ["customer", "seller"],
        default: "customer"
    },
    address:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive']
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },

},{
    autoCreate: true,
    autoIndex: true,
    timestamps: true
})
const UserModel = mongoose.model("User", UserSchemaDef)
module.exports = UserModel