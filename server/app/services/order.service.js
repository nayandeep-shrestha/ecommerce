const ProductModel = require("../model/product.model")
class OrderService{
    getCartItem = async (cart) => {
        try{
            let product_ids= cart.map((item, index) => item.product_id)
            let sub_cart = await ProductModel.find({
                _id:{
                    $in: product_ids
                }
            },{
                _id:1,
                actual_price:1,
                title:1,
                images:1
            })
            return sub_cart
        }catch(excep){
            throw excep
        }
    }
    
}

module.exports = OrderService