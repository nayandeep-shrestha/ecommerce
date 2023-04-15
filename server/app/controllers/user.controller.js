const UserService= require("../services/user.service")
const bcrypt = require("bcrypt")
const sendEmail = require("../services/mail.service")
class UserController{
    constructor() {
        this.user_svc= new UserService()
    }
    getAllList = async (req,res,next) => {
        try{
            let result = await this.user_svc.getAllUsers(req.auth_user._id)
            res.json({
                result:result,
                status: true,
                msg:"User fetched"
            })

        }catch(excep){
            console.log("getAllList: "+ excep)
            next({
                status: 422,
                msg: excep
            })
        }
    }
    createContent = async (req,res,next) => {
        try{
            let data= req.body
            if(req.file){
                data.image= req.file.filename
            }

            await this.user_svc.validateData(data)
            data.password = bcrypt.hashSync(data.password, 10)
            let response = await this.user_svc.saveContent(data);
            if(response){
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
            }else{
                throw "Problem while creating user"
            }
        }catch(excep){
            console.log("createContent: "+ excep)
            next({
                status: 422,
                msg: excep
            })
        }
    }
    updateContent = async (req, res, next) =>{
        try{
            let data= req.body
            let user= await this.user_svc.getUserById(req.params.id)

            if(req.file){
                data.image= req.file.filename
            }else{
                data.image = user.image
            }
            
            await this.user_svc.validateData(data, true)
            
            let response = await this.user_svc.updateContent(data, req.params.id);
            if(response){
                res.json({
                    result: response,
                    staus: true,
                    msg:"User updated"
                })
            }else{
                throw "Problem while updating content"
            }
        }catch(excep){
            console.log("updateContent: "+ excep)
            next({
                status: 422,
                msg: excep
            })
        }
    }
    deleteContent = async (req, res, next) => {
        try{
            let response = await this.user_svc.deleteByID(req.params.id)
            res.json({
                result: response,
                status: true,
                msg: "Content deleted."
            })
        }catch(excep){
            next({status: 422, msg: excep})
        }
    }
    getById =async (req, res, next) => {
        try{
            let data = await this.user_svc.getUserById(req.params.id)
            res.json({
                status: true,
                result: data,
                msg: "Data fetched"
            })
        }catch(excep){
            throw ({status: 422, msg: excep})
        }
    }
    changePass = async(req,res,next) => {
        try {
            let passwordData = req.body
            if(!passwordData.curr_password || !passwordData.new_password || !passwordData.confirm_password){
                throw "Empty password fields are not allowed"
            }else{
                let verification = await this.user_svc.updatePassword(passwordData, req.auth_user._id)
                if(verification){
                    sendEmail({
                        to: verification.email,
                        subject: "Password Changed",
                        html: `<p>Dear ${verification.name},</p> <p>Your password has been changed successfully !!</p>`
                    })
                    res.json({
                        result: verification.email,
                        status: true,
                        msg: "Password has been changed successfully"
                    })
                }
            }
            
        } catch (error) {
            next({
                status: 400,
                msg: error
            })
        }
    }
}

module.exports= UserController