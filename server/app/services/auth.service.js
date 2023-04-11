const OTPModel = require("../model/OTPverification.model")
const UserModel = require("../model/user.model")
const bcrypt = require("bcrypt")
const sendEmail = require("../services/mail.service")
class AuthService {
    validateRegisterData = async (data) => {
        let err_msg = {}
        if (!data.name) {
            throw "Name field is required"
        }

        if (!data.email) {
            throw "Email field is required"
        } else if (!(String(data.email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ))) {
            throw "Invalid email"
        }

        if(!data.address){
            throw "Address field is required"
        }else if (!(String(data.address)
            .toLowerCase()
            .match(
                /^[#.0-9a-zA-Z\s,-]+$/
            ))) {
            throw "Invalid address"
        }

        if (!data.mobile) {
            throw "Mobile no. is required"
        } else if (!(String(data.mobile).match(/^(\+977)?[9][6-9]\d{8}$/))) {
            throw "Please enter valid mobile number"
        }

        if (!data.password) {
            throwd = "Password field is required"
        } else if (!(String(data.password).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))) {
            throwd = "Password must contain at least a uppercase, a lowercase, a special character and a number"
        }

        if (!data.role) {
            throw "Role field is required"
        } else if (!["admin", "seller", "customer"].includes(data.role)) {
            throw "user role  can be admin, seller or customer"
        }

        if (Object.keys(err_msg).length === 0) {
            return null;
        }
        else {
            throw err_msg;
        }
    }
    loginUser = async (username, password) => {
        try {
            let user = await UserModel.findOne({
                email: username
            })
            if (!user) {
                throw "Credentials doesn't match"
            } else {
                return user
            }
        } catch (error) {
            throw error
        }
    }
    registerUser = async (data) => {
        try {
            let user = new UserModel(data)
            let res = await user.save()
            return res
        } catch (error) {
            if (error.code === 11000) {
                let keys = Object.keys(error.keyValue)
                throw keys.join(",") + " should be unique"
            } else {
                throw error
            }
        }
    }
    checkMail = async (email) => {
        try {
            let user = await UserModel.findOne({
                email: email
            })
            if (!user) {
                throw "Email not found"
            } else {
                return user
            }
        } catch (error) {
            throw error
        }
    }
    sendOTP = async (data) => {
        try {
            const otp = `${Math.floor(1000 + Math.random() * 9000)}`
            sendEmail({
                to: data.email,
                subject: "Verify Your Email",
                text: `Hi ${data.name}`,
                html: `<p>Please enter below mentioned 4 digit code into the Email Verification page.</p><p>The OTP <b>expires after 1:30 mins</b></p><p style="text-align:center; color:#ff5e36; font-size:30px"><b>${otp}</b></p>`
            })
            const hashedOTP = bcrypt.hashSync(otp, 10)
            let otpRecord = {
                user_id: data._id,
                otp: hashedOTP,
                created_at: Date.now(),
                expires_at: Date.now() + 90000
            };
            let otpData = new OTPModel(otpRecord)
            let res = await otpData.save()
            return res

        } catch (error) {
            throw error
        }
    }
    verify = async ({ id, otp }) => {
        try {
            const otpVerifiedRecord = await OTPModel.find({
                user_id: id
            })
            if (otpVerifiedRecord.length <= 0) {
                //no record found
                throw "Account record doesn't exist or has been verified already."
            } else {
                //otp record exists
                const { expires_at } = otpVerifiedRecord[0]
                const hashedOTP = otpVerifiedRecord[0].otp
                if (expires_at < Date.now()) {
                    //otp has expired
                    await OTPModel.deleteMany({ user_id: id })
                    throw "OTP has been expired. Please request again"
                } else {
                    // const validOTP = await 
                    if (bcrypt.compareSync(otp, hashedOTP)) {
                        await OTPModel.deleteMany({ id })
                        return id
                    } else {
                        throw "OTP did not match. Please check your email"
                    }
                }
            }
        } catch (error) {
            throw error
        }
    }
}

module.exports = AuthService