const AuthService = require("../services/auth.service")
const OTPModel = require("../model/OTPverification.model")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const Config = require("../../config/config")
const sendEmail = require("../services/mail.service")
const UserModel = require("../model/user.model")
class AuthController {
    constructor() {
        this.auth_svc = new AuthService()
    }
    login = async (req, res, next) => {
        try {
            let data = req.body
            let user = await this.auth_svc.loginUser(data.email, data.password)
            if (user) {
                if (bcrypt.compareSync(data.password, user.password)) {
                    res.json({
                        result: {
                            detail: user,
                            token: JWT.sign({ id: user._id }, Config.JWT_SECRET)
                        },
                        status: true,
                        msg: "Logged in successfully"
                    })
                } else {
                    throw "Credentials does not match"
                }
            } else {
                throw "User does not exist"
            }
        } catch (error) {
            next({
                status: 400,
                msg: error
            })
        }
    }
    register = async (req, res, next) => {
        try {
            let data = req.body
            if (req.file) {
                data.image = req.file.filename
            }
            await this.auth_svc.validateRegisterData(data)
            data.password = bcrypt.hashSync(data.password, 10)
            let response = await this.auth_svc.registerUser(data);

            sendEmail({
                to: data.email,
                subject: "Account registered",
                text: "Plaintext version of the message",
                html: `<p>Dear ${data.name}, your account has been successfully registered</p>`
            })
            res.json({
                result: { response: response },
                status: true,
                msg: "Registered user successfully"
            })

        } catch (error) {
            next({
                status: 400,
                msg: error
            })
        }
    }
    getLoggedInUser = async (req, res, next) => {
        res.json({
            result: req.auth_user,
            status: true,
            msg: "Logged in user fetched"
        })
    }
    checkUser = async (req, res, next) => {
        try {
            let data = await this.auth_svc.checkMail(req.body.email)
            if (!data) {
                throw "Email not found"
            }
            else {
                let sendOTP = await this.auth_svc.sendOTP(data)
                res.json({
                    result: {
                        user_id: data._id,
                        email: data.email
                    },
                    status: "pending",
                    message: "Verification email sent"
                })
            }
        } catch (error) {
            next({
                status: 400,
                msg: error
            })
        }
    }
    verifyOTP = async (req, res, next) => {
        try {
            let { id, otp } = req.body
            if (!id || !otp) {
                throw "Empty otp details are not allowed"
            } else {
                let verifiedData = await this.auth_svc.verify({ id, otp })
                res.json({
                    result: verifiedData,
                    status: true,
                    msg: "User email verified successfully"
                })
            }
        } catch (error) {
            next({
                status: 400,
                msg: error
            })
        }
    }
    resendOTP = async (req, res, next) => {
        try {
            let id = req.body.id
            if (!id) {
                throw "Empty details are not allowed"
            } else {
                await OTPModel.deleteMany({ user_id: id })
                let user = await UserModel.findOne({
                    _id: id
                })
                // console.log(user)
                let sendOTP = await this.auth_svc.sendOTP(user)
                res.json({
                    result: {
                        user_id: user._id,
                        email: user.email
                    },
                    status: "pending",
                    message: "Verification email sent"
                })
            }
        } catch (error) {
            next({
                status: 400,
                msg: error
            })
        }
    }
    changePw = async (req, res, next) => {
        try {
            let hashedpassword = bcrypt.hashSync(req.body.password, 10)
            let result = await UserModel.findByIdAndUpdate(req.body.id, {
                $set: {
                    password: hashedpassword
                }
            })
            if (result) {
                res.json({
                    result: {
                        email: result.email
                    },
                    status: true,
                    message: "Password changed successfully"
                })
            }
        } catch (error) {
            next({
                status: 400,
                msg: error
            })
        }
    }
}
module.exports = AuthController