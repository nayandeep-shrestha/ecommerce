const router = require("express").Router()
const ProductController = require("../app/controllers/product.controller")
const loginCheck = require("../app/middleware/auth.middleware")
const {isAdminSeller} = require("../app/middleware/rbac.middleware")
const uploader = require("../app/middleware/uploader.middleware")
const product_ctrl = new ProductController()

const upload_path = (req, res, next) => { 
    req.upload_path = "public/uploads/product";
    next();
}
router.get('/search', product_ctrl.listSearchResults)
router
    .route('/')
        .get(product_ctrl.getAllProducts)
        .post(loginCheck, isAdminSeller,upload_path, uploader.array('images'), product_ctrl.createProduct)
router
    .route('/:id')
        .put(loginCheck, isAdminSeller,upload_path, uploader.array('images'), product_ctrl.updateProduct)
        .delete(loginCheck, isAdminSeller, product_ctrl.deleteProduct)
        .get(product_ctrl.getProductById)

module.exports = router 