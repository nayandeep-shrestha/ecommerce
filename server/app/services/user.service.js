const Joi = require("joi")
const bcrypt = require("bcrypt")
const UserModel = require("../model/user.model")
class UserService{
    getAllUsers = async (id) => {
        try{
            let result= await UserModel.find({
                _id:{$nin: [id]}
            })
            return result
        }catch(excep){
            throw excep
        }
    }
    validateData = async (data, isEdit=false) => {
        try{
            let schema;
            if(isEdit){
                schema = Joi.object({
                    name: Joi.string().required().min(3),
                    email:Joi.string().email().required(),
                    image: Joi.string(),
                    mobile: Joi.string().required(),
                    address: Joi.string().required().regex( /^[#.0-9a-zA-Z\s,-]+$/),
                    role: Joi.string().valid("seller","customer"),
                    status: Joi.string().valid("active","inactive").default("inactive")                
                })
            }else{
                schema = Joi.object({
                    name: Joi.string().required().min(3),
                    email:Joi.string().email().required(),
                    image: Joi.string(),
                    mobile: Joi.string().required().length(10,"Mobile number must be 10 digits."),
                    address: Joi.string().required().matches( /^[#.0-9a-zA-Z\s,-]+$/),
                    role: Joi.string().valid("seller","customer"),
                    password:Joi.string().required().min(8),
                    status: Joi.string().valid("active","inactive").default("inactive")                
                })
            }
            let response = schema.validate(data)
            // console.log(response.error)
            if(response.error){
                throw response.error.details[0].message
            }
        }catch(excep){
            throw excep
        }
    }
    saveContent = async (data) => {
        try{
            let user = new UserModel(data);
            return user.save()
        }catch(excep){
            throw excep
        }
    }
    updateContent = async (data,id) => {
        try{
            return await UserModel.findByIdAndUpdate(id, {
                $set: data
            })
        }catch(excep){
            throw excep
        }
    }
    getUserById = async (id) => {
       try{ 
            let data = await UserModel.findOne({
                    _id:id
                })
            if(!data){
                throw "Resource not found"
            }
            return data
        }catch(excep){
            throw excep
        }
    }
    deleteByID = async (id) => {
        try{
            let data = await UserModel.findOneAndDelete({
                _id:id
            })
        if(!data){
            throw "Content already deleted"
        }
        return data
        }catch(excep){
            throw excep
        }
    }
    updatePassword= async(passwordData, id)=>{
        try{
            const userData = await UserModel.find({
                _id: id
            })
            if(userData.length <= 0){
                throw "Account not found"
            }else{
                const hashedpassword = userData[0].password
                const user_id = userData[0]._id
                if(bcrypt.compareSync(passwordData.curr_password, hashedpassword)){
                    const new_password = bcrypt.hashSync(passwordData.new_password,10)
                    let result = await UserModel.findByIdAndUpdate(user_id, {
                            password: new_password
                    })
                    if(result){
                        return result
                    }else{
                        throw "Password was not changed. Please try again"
                    }
                }else{
                    throw "Password didn't match"
                }
            }
        }catch(excep){
            throw excep
        }
    }
}
module.exports= UserService