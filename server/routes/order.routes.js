const loginCheck = require("../app/middleware/auth.middleware")
const { isCustomer, isAdmin,isAdminSeller } = require("../app/middleware/rbac.middleware")
const OrderController = require("../app/controllers/order.controller")
const order_ctrl = new OrderController()

const router = require("express").Router()

router.post("/", loginCheck, isCustomer ,order_ctrl.createOrder)
router.post("/cart",order_ctrl.getCartData)
router.get("/list", loginCheck, order_ctrl.getOrderListByUserId)
router.get("/Orders", loginCheck,isAdmin, order_ctrl.getAllOrders)
router.get("/:id", loginCheck, isAdmin, order_ctrl.getOrderDetails)
router.delete("/:id", loginCheck, isAdminSeller, order_ctrl.deleteOrder)
module.exports = router