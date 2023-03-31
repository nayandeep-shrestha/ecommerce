const { default: slugify } = require("slugify")
const CategoryService= require("../services/category.service")
const ProductService = require("../services/product.service")
class CategoryController{
    constructor() {
        this.category_svc= new CategoryService()
        this.products_svc= new ProductService()
    }
    getAllList = async (req,res,next) => {
        try{
            let result = await this.category_svc.getAllCategories()
            res.json({
                result:result,
                status: true,
                msg:"Category fetched"
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

            data.slug = slugify(data.name, {lower:true})
            if(!data.parent_id || data.parent_id === "null"){
                data.parent_id = null
            }
            await this.category_svc.validateData(data)
            let response = await this.category_svc.saveContent(data);
            if(response){
                res.json({
                    result: response,
                    staus: true,
                    msg:"Category created"
                })
            }else{
                throw "Problem while creating category"
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
            let category= await this.category_svc.getCategoryById(req.params.id)

            if(req.file){
                data.image= req.file.filename
            }else{
                data.image = category.image
            }
            if(!data.parent_id || data.parent_id === "null"){
                data.parent_id = null
            }
            await this.category_svc.validateData(data)
            let response = await this.category_svc.updateContent(data, req.params.id);
            if(response){
                res.json({
                    result: response,
                    staus: true,
                    msg:"Category updated"
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
            let response = await this.category_svc.deleteByID(req.params.id)
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
            let data = await this.category_svc.getCategoryById(req.params.id)
            res.json({
                status: true,
                result: data,
                msg: "Data fetched"
            })
        }catch(excep){
            throw ({status: 422, msg: excep})
        }
    }
    getCategoryProducts = async (req, res, next) => {
        try{
            let data = await this.category_svc.getCategoryBySlug(req.params.slug)
            let products = await this.products_svc.getProductsByCategory(data._id)
            res.json({
                status: true,
                result: {
                    category: data,
                    products: products
                },
                msg: "Data fetched"
            })
        }catch(excep){
            throw ({status: 422, msg: excep})
        }
    }
}

module.exports= CategoryController