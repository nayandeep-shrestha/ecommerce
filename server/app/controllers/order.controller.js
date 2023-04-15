const OrderModel = require("../model/order.model")
const OrderService = require("../services/order.service")
const sendEmail = require("../services/mail.service")
class OrderController {
    constructor() {
        this.order_svc = new OrderService()
    }
    createOrder = async (req, res, next) => {
        try {
            let cart = req.body
            let final_result = {
                user_id: req.auth_user._id,
                cart: [],
                sub_total: 0,
                delivery_charge: cart.delivery_charge,
                discount: cart.discount,
                total_amount: 0,
                status: "pending",
                is_paid: !!cart.is_paid,
                shipping:{
                    address: cart.address,
                    mobile: cart.mobile,
                    email: cart.email
                }
            }
            let sub_cart = await this.order_svc.getCartItem(cart.cart)
            final_result.cart = (sub_cart.map((item) => {
                let current_item = cart.cart.filter((current_cart_item) => item._id.equals(current_cart_item.product_id))
                final_result.sub_total += Number(Number(current_item[0].quantity) * item.actual_price)
                return {
                    product_id: item._id,
                    qty: current_item[0].quantity,
                    total_amt: Number(current_item[0].quantity) * item.actual_price
                }
            }
            ))
            final_result.total_amount = final_result.sub_total - final_result.discount + final_result.delivery_charge
            let order = await OrderModel(final_result)
            order.save()
            sendEmail({
                to: order.shipping.email,
                subject: "Order Placement",
                html: `<img src="../../logo.png" style="text-align-center">
                <p>Hi ${req.auth_user.name},</p>
                <p>Thank you for ordering from TechShop!</p>
                <p>We're excited for you to receive your order #${order._id}. We hope you had a great shopping experience!</p>
                <div>
                    <h4>Delivery Details</h4>
                    <p><b>Name:</b>&nbsp;${req.auth_user.name}</p>
                    <p><b>Address:</b>&nbsp;${order.shipping.address}</p>
                    <p><b>Phone:</b>&nbsp;${order.shipping.mobile}</p>
                    <p><b>Email:</b>&nbsp;${order.shipping.email}</p>
                </div>`
            })
            res.json({
                result: order,
                status: true,
                msg: "Your order has been placed"
            })
        } catch (excep) {
            next({
                status: 400,
                msg: excep
            })
        }
    }
    getCartData = async (req, res, next) => {
        try {
            let cart = req.body

            let sub_cart = await this.order_svc.getCartItem(cart.cart)
            let final_result = []
            final_result = (sub_cart.map((item) => {
                let current_item = cart.cart.filter((current_cart_item) => item._id.equals(current_cart_item.product_id))
                final_result.sub_total += Number(Number(current_item[0].qty) * item.actual_price)
                return {
                    product_id: item._id,
                    price: item.actual_price,
                    name: item.title,
                    image: item.images[0],
                    qty: current_item[0].quantity,
                    total_amt: Number(current_item[0].quantity) * item.actual_price
                }
            }
            ))
            res.json({
                result: final_result,
                status: true,
                msg: "Your cart detail"
            })
        } catch (excep) {
            next({
                status: 400,
                msg: excep
            })
        }
    }
    getOrderListByUserId = async (req, res, next) => {
        try {
            let orderList = await OrderModel.find({
                user_id: req.body.id
            })
            if(orderList){
                res.json({
                    result: orderList,
                    status: true,
                    msg: "Your cart detail"
                })
            }else{
                throw "No orders have been made yet"
            }
        } catch (excep) {
            next({
                status: 400,
                msg: excep
            })
        }
    }
}
module.exports = OrderController