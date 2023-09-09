const ProductModel = require("../model/product.model")
const OrderModel = require("../model/order.model")
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
    deleteOrder = async (id) => {
        try {
            let data = await OrderModel.findOneAndDelete({
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
    getOrderById = async (id) => {
        try {
            let data = await OrderModel.findOne({
                _id: id
            }).populate("user_id")
            if (!data) {
                throw "Resource not found"
            }
            return data
        } catch (excep) {
            throw excep
        }
    }
}

module.exports = OrderService