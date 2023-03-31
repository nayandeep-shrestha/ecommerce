const Joi = require("joi")
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
                    image: Joi.string(),
                    role: Joi.string().valid("seller","customer"),
                    status: Joi.string().valid("active","inactive").default("inactive")                
                })
            }else{
                schema = Joi.object({
                    name: Joi.string().required().min(3),
                    email:Joi.string().email().required(),
                    image: Joi.string(),
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
}
module.exports= UserService