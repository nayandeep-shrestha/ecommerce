const router = require("express").Router()
const CategoryController = require("../app/controllers/category.controller")
const loginCheck = require("../app/middleware/auth.middleware")
const {isAdmin} = require("../app/middleware/rbac.middleware")
const uploader = require("../app/middleware/uploader.middleware")
const category_ctrl = new CategoryController()

const upload_path = (req, res, next) => { 
    req.upload_path = "public/uploads/category";
    next();
}
router
    .route('/')
        .get(category_ctrl.getAllList)
        .post(loginCheck, isAdmin,upload_path, uploader.single('image'), category_ctrl.createContent)
router
    .route('/:id')
    .put(loginCheck, isAdmin,upload_path, uploader.single('image'), category_ctrl.updateContent)
    .delete(loginCheck, isAdmin, category_ctrl.deleteContent)
    .get(category_ctrl.getById)
router.get('/products-list/:slug', category_ctrl.getCategoryProducts)
module.exports = router 