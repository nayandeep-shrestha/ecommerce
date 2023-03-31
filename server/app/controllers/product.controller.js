const { default: slugify } = require("slugify")
const ProductService= require("../services/product.service")
class ProductController{
    constructor() {
        this.product_svc= new ProductService()
    }
    getAllProducts = async (req,res,next) => {
        try{
            let result = await this.product_svc.getAllProducts()
            res.json({
                result:result,
                status: true,
                msg:"Products fetched"
            })

        }catch(excep){
            console.log("Product listing: "+ excep)
            next({
                status: 422,
                msg: excep
            })
        }
    }
    createProduct = async (req,res,next) => {
        try{
            let data= req.body
            if(req.files){
                data.images= req.files.map((item) => item.filename)
            }

            data.slug = slugify(data.title, {lower:true})

            if(!data.categories || data.categories === "null"){
                data.categories = null
            }else{
                data.categories = data.categories.split(",")
            }
            if(!data.brand || data.brand === "null"){
                data.brand = null
            }
            if(!data.seller || data.seller === "null"){
                data.seller = null
            }
           
            await this.product_svc.validateData(data)
            data.actual_price= data.price - data.price * data.discount / 100 ;
            let response = await this.product_svc.saveContent(data);
            if(response){
                res.json({
                    result: response,
                    staus: true,
                    msg:"Product created"
                })
            }else{
                throw "Problem while creating product"
            }
        }catch(excep){
            console.log("createContent: "+ excep)
            next({
                status: 422,
                msg: excep
            })
        }
    }
    updateProduct = async (req, res, next) =>{
        try{
            let data= req.body
            data.images=[]
            if(req.files){
                data.images= req.files.map((item) => item.filename)
            }

            if(!data.categories || data.categories === "null"){
                data.categories = null
            }else{
                data.categories = data.categories.split(",")
            }
            if(!data.brand || data.brand === "null"){
                data.brand = null
            }
            if(!data.seller || data.seller === "null"){
                data.seller = null
            }
            
            let current_product = await this.product_svc.getProductById(req.params.id)
            data.slug= current_product.slug

            //to handle delete image
            if(data.del_image){
                let image_to_delete = data.del_image.split(",")
                current_product.images.map((item) => {
                    if(!image_to_delete.includes(item)){
                         data.images.push(item)
                    }
                })
            }
            delete data.del_image  // not working delete operation

            await this.product_svc.validateData(data)
            data.actual_price= data.price - data.price * data.discount / 100 ;
            let response = await this.product_svc.updateProduct(data, req.params.id);
            if(response){
                res.json({
                    result: response,
                    staus: true,
                    msg:"Product updated"
                })
            }else{
                throw "Problem while updating product"
            }
        }catch(excep){
            console.log("Update Content: "+ excep)
            next({
                status: 422,
                msg: excep
            })
        }
    }
    deleteProduct = async (req, res, next) => {
        try{
            let response = await this.product_svc.deleteProduct(req.params.id)
            res.json({
                result: response,
                status: true,
                msg: "Product deleted."
            })
        }catch(excep){
            next({status: 422, msg: excep})
        }
    }
    getProductById =async (req, res, next) => {
        try{
            let data = await this.product_svc.getProductById(req.params.id)
            res.json({
                status: true,
                result: data,
                msg: "Product fetched"
            })
        }catch(excep){
            throw ({status: 422, msg: excep})
        }
    }
    listSearchResults = async (req, res, next) => {
        {
            let filter = {
                title: {$regex: req.query.keyword, $options:'i'}
            }
            try{
                let result = await this.product_svc.getSearchItems(filter)
                res.json({
                    result:result,
                    status: true,
                    msg:"Products fetched"
                })
    
            }catch(excep){
                console.log("Product listing: "+ excep)
                next({
                    status: 422,
                    msg: excep
                })
            }
        }
    }
}

module.exports= ProductController