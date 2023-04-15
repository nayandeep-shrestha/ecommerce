const JWT = require("jsonwebtoken")
const Config = require("../../config/config")
const UserModel = require("../model/user.model")
const loginCheck = async(req, res, next) => {
    try {
        let token = null
        if (req.headers['authorization']) {
            token = req.headers['authorization']
        }
        if (!token) {
            next({ status: 401, msg: "Log in first" })
        } else {
            let parts = token.split(" ")
            token = parts.pop()
            if (!token) {
                //unauthorized
                next({
                    status: 401, msg: " token not provided"
                })
            } else {
                //success
                let data = JWT.verify(token, Config.JWT_SECRET)
                if (data) {
                    let user =await UserModel.findById(data.id)
                    let user_data= {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        mobile: user.mobile,
                        role: user.role,
                        address: user.address,
                        status: user.status,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                    }
                    if(user){
                        //logged in user
                        req.auth_user= user_data
                        next()
                    }else{
                        next({status: 404, msg:"User does not exist"})
                    }
                } else {
                    next({ status: 401, msg: "Invalid token" })
                }
            }
        }
    } catch (error) {
        next({ status: 401, msg: error })
    }
}

module.exports = loginCheck