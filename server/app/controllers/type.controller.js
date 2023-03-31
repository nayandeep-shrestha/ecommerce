const { default: slugify } = require("slugify")
const TypeService= require("../services/type.service")
const ProductService= require("../services/product.service")
class TypeController{
    constructor() {
        this.type_svc= new TypeService()
        this.products_svc = new ProductService()
    }
    getAllList = async (req,res,next) => {
        try{
            let result = await this.type_svc.getAllList(req.type)
            res.json({
                result:result,
                status: true,
                msg: req.type+ " fetched"
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
            data.type= req.type
            if(req.file){
                data.image= req.file.filename
            }
            if(!data.link || data.link === 'null'){
                data.link = slugify(data.title, {lower:true})
            }
            await this.type_svc.validateData(data)
            let response = await this.type_svc.saveContent(data);
            if(response){
                res.json({
                    result: response,
                    status: true,
                    msg:req.type + " content created"
                })
            }else{
                throw "Problem while creating content"
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
            let type= await this.type_svc.getById(req.type, req.params.id)
            data.type= req.type
            if(req.file){
                data.image= req.file.filename
            }else{
                data.image = type.image
            }
            if(!data.link || data.link === 'null'){
                data.link = type.link
            }
            await this.type_svc.validateData(data)
            let response = await this.type_svc.updateContent(data, req.params.id);
            if(response){
                res.json({
                    result: response,
                    staus: true,
                    msg:req.type + " content updated"
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
            let response = await this.type_svc.deleteByID(req.type, req.params.id)
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
            let data = await this.type_svc.getById(req.type, req.params.id)
            res.json({
                status: true,
                result: data,
                msg: "Data fetched"
            })
        }catch(excep){
            throw ({status: 422, msg: excep})
        }
    }
    getBrandProducts = async (req, res, next) => {
        // console.log(req)
        try{
            let brand = await this.type_svc.getBrand(req.type, req.params.slug)
            let products = await this.products_svc.getProductsByBrand(brand._id)
            res.json({
                status: true,
                result: {
                    brand: brand,
                    products: products
                },
                msg: "Data fetched"
            }) 
        }catch(error){
            console.log("getBrandProducts: "+ error)
            next({
                status: 422,
                msg: error
            })
        }
    }
}

module.exports= TypeController