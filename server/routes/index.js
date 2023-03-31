const router = require("express").Router();
const auth_routes = require("./auth.routes");
const type_routes = require("./type.routes");
const category_routes = require("./category.routes");
const product_routes = require("./product.routes");
const order_routes = require("./order.routes");
const user_routes = require("./user.routes");

// http://localhost:8000/api/v1/auth
router.use("/auth", auth_routes)

// http://localhost:8000/api/v1/
router.use("/category",category_routes)
router.use("/product",product_routes)
router.use("/order",order_routes)
router.use("/user",user_routes)
router.use("/",type_routes)

module.exports = router;
