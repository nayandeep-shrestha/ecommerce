const AuthService = require("../services/auth.service")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const Config = require("../../config/config")
const sendEmail = require("../services/mail.service")
class AuthController{
    constructor(){
        this.auth_svc = new AuthService()
    }
    login = async (req, res, next) => {
       try{
            let data= req.body
            let user= await this.auth_svc.loginUser(data.email, data.password)
            if(user){
                if(bcrypt.compareSync(data.password, user.password)){
                    res.json({
                        result:{
                            detail: user,
                            token: JWT.sign({id: user._id}, Config.JWT_SECRET)
                        },
                        status: true,
                        msg: "Logged in successfully"
                    })
                }else{
                    throw "Credentials does not match"
                }
            }else{
                throw "User does not exist"
            }
       }catch(error){
            next({
                status:400,
                msg:error
            })
       }
    }
    register = async (req, res, next) => {
        try{
            let data= req.body
            if(req.file){
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
                result:{response: response},                
                status: true,
                msg:"Registered user successfully"
            })

        }catch(error){
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
}
module.exports = AuthController