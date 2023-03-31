const UserModel = require("../model/user.model")

class AuthService{
    validateRegisterData = async (data) => {
        let err_msg ={}
        if (!data.name){
            err_msg.name = "Name field is required"
        }
        
        if (!data.email){
            err_msg.email = "Email field is required"
        }else if(!(String(data.email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ))){
                err_msg.email ="Invalid email"
            }
            
        if (!data.password){
                err_msg.password = "Password field is required"
        }else if(!(String(data.password).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)))
            {
                err_msg.password ="Password must contain at least a uppercase, a lowercase, a special character and a number"
            }

        if (!data.role){
            err_msg.role = "Role field is required"
        }else if(!["admin", "seller", "customer"].includes(data.role)){
            err_msg.role = "user role  can be admin, seller or customer"
        }

        if(Object.keys(err_msg).length === 0){
            return null;
        }
        else{
            throw err_msg;
        }
    }
    loginUser = async (username, password) =>{
        try{
            let user = await UserModel.findOne({
                email: username
            })
            if(!user){
                throw "Credentials doesn't match"
            }else{
                return user
            }
        }catch(error){
            throw error
        }
    }
    registerUser = async (data) =>{
        try{
            let user = new UserModel(data)
            let res =await user.save()
            return res
        }catch(error){
            if(error.code === 11000){
                let keys = Object.keys(error.keyValue)
                throw keys.join(",")+" should be unique"
            }else {
                throw error
            }
        }
    }
}

module.exports = AuthService