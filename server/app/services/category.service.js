const Joi = require("joi")
const CategoryModel = require("../model/category.model")
class CategoryService {
    getAllCategories = async () => {
        try {
            let result = await CategoryModel.find().populate("parent_id")
            return result
        } catch (excep) {
            throw excep
        }
    }
    validateData = async (data) => {
        try {
            let schema = Joi.object({
                name: Joi.string().required().min(3),
                image: Joi.string(),
                slug: Joi.string(),
                status: Joi.string().valid("active", "inactive").default("inactive"),
                parent_id: Joi.string().allow(null, '')
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
            let category = new CategoryModel(data);
            return category.save()
        } catch (excep) {
            throw excep
        }
    }
    updateContent = async (data, id) => {
        try {
            return await CategoryModel.findByIdAndUpdate(id, {
                $set: data
            })
        } catch (excep) {
            throw excep
        }
    }
    deleteByID = async (id) => {
        try {
            let data = await CategoryModel.findOneAndDelete({
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
    getCategoryById = async (id) => {
        try {
            let data = await CategoryModel.findOne({
                _id: id
            }).populate("parent_id")
            if (!data) {
                throw "Resource not found"
            }
            return data
        } catch (excep) {
            throw excep
        }
    }
    getCategoryBySlug = async (slug) => {
        try {
            let data = await CategoryModel.findOne({
                slug: slug
            }).populate("parent_id")
            if (!data) {
                throw "Resource not found"
            }
            return data
        }catch (excep) {
            throw excep
        }
    }

}
module.exports = CategoryService