const mongoose =require("mongoose")
const OTPSchemaDef = new mongoose.Schema({
    user_id: String,
    otp: String,
    created_at: Date,
    expires_at: Date
})
const OTPModel = mongoose.model("OTP", OTPSchemaDef)
module.exports = OTPModel