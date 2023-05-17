const Joi = require("joi")
const ProductModel = require("../model/product.model")
class ProductService {
    getAllProducts = async () => {
        try {
            let result = await ProductModel.find().populate("categories").populate("brand").populate("seller")
            return result
        } catch (excep) {
            throw excep
        }
    }
    getSearchItems = async (filter = {}) => {
        try {
            let result = await ProductModel.find(filter).populate("categories").populate("brand").populate("seller")
            return result
        } catch (excep) {
            throw excep
        }
    }
    validateData = async (data) => {
        try {
            let schema = Joi.object({
                title: Joi.string().required().min(3),
                images: Joi.array(),
                slug: Joi.string(),
                status: Joi.string().valid("active", "inactive").default("inactive"),
                categories: Joi.array().required(),
                brand: Joi.string(),
                price: Joi.number().required(),
                discount: Joi.number().default(0),
                description: Joi.string(),
                seller: Joi.string().empty(null, ""),
                sku: Joi.string().empty(null, ""),
                stock: Joi.number().empty(null, 0),
                rating: Joi.number(),
                // numOfReviews: Joi.number(),
                // reviews: Joi.array().items(Joi.object(
                //     {
                //         name: Joi.string().required().min(3),
                //         rating: Joi.number().required(),
                //         comment: Joi.string().required()
                //     }
                // ))
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
            let product = new ProductModel(data);
            return product.save()
        } catch (excep) {
            throw excep
        }
    }
    updateProduct = async (data, id) => {
        try {
            return await ProductModel.findByIdAndUpdate(id, {
                $set: data
            })
        } catch (excep) {
            throw excep
        }
    }
    getProductById = async (id) => {
        try {
            let data = await ProductModel.findOne({
                _id: id
            }).populate("categories").populate("brand").populate("seller")
            if (!data) {
                throw "Resource not found"
            }
            return data
        } catch (excep) {
            throw excep
        }
    }
    deleteProduct = async (id) => {
        try {
            let data = await ProductModel.findOneAndDelete({
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
    getProductsByCategory = async (id) => {
        try {
            let data = await ProductModel.find({
                categories: id
            }).populate("categories").populate("brand").populate("seller")
            if (!data) {
                throw "Resource not found"
            }
            return data
        } catch (excep) {
            throw excep
        }
    }
    getProductsByBrand = async (id) => {
        try {
            let data = await ProductModel.find({
                brand: id
            }).populate("categories").populate("brand").populate("seller")
            if (!data) {
                throw "Resource not found"
            }
            return data
        } catch (excep) {
            throw excep
        }
    }
}
module.exports = ProductService