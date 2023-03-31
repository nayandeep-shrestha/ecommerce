const Joi = require("joi")
const TypeModel = require("../model/type.model")
class TypeService {
    getAllList = async (type) => {
        try {
            let result = await TypeModel.find({
                type: type
            })
            return result
        } catch (excep) {
            throw excep
        }
    }
    validateData = async (data) => {
        try {
            let schema = Joi.object({
                title: Joi.string().required().min(2),
                image: Joi.string().required(),
                link: Joi.string(),
                type: Joi.string().valid("brand", "banner"),
                status: Joi.string().valid("active", "inactive").default("inactive")
            })
            let response = schema.validate(data)
            if (response.error) {
                throw response.error.details[0].message
            }
            return data
        } catch (excep) {
            throw excep
        }
    }
    saveContent = async (data) => {
        try {
            let type = new TypeModel(data);
            return type.save()
        } catch (excep) {
            throw excep
        }
    }
    updateContent = async (data, id) => {
        try {
            return await TypeModel.findByIdAndUpdate(id, {
                $set: data
            })
        } catch (excep) {
            throw excep
        }
    }
    getById = async (type, id) => {
        try {
            let data = await TypeModel.findOne({
                type: type,
                _id: id
            })
            if (!data) {
                throw "Resource not found"
            }
            return data
        } catch (excep) {
            throw excep
        }
    }
    deleteByID = async (type, id) => {
        try {
            let data = await TypeModel.findOneAndDelete({
                type: type,
                _id: id
            })
            if (!data) {
                throw "Content already deleted"
            }
            return data
        } catch (excep) {
            throw excep
        }
    }
    getBrand = async (type, brand) => {
        try {
            let data = await TypeModel.findOne({
                link: brand,
            })
            if (!data) {
                throw "Resource not found"
            }
            return data
        } catch (excep) {
            throw excep
        }
    }
}
module.exports = TypeService