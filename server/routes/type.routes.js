const router = require("express").Router()
const TypeController = require("../app/controllers/type.controller")
const type_ctrl = new TypeController()
const loginCheck = require("../app/middleware/auth.middleware")
const {isAdmin} = require("../app/middleware/rbac.middleware")
const uploader = require("../app/middleware/uploader.middleware")

const contentType = (req, res, next) => {
    if(req.params.type && ['brand', 'banner'].includes(req.params.type)){
        req.type= req.params.type;
        next()
    }else{
        next({
            status: 404,
            msg: "Request does not exist"
        })
    }
}
const upload_path = (req, res, next) => { 
    req.upload_path = "public/uploads/"+req.type;
    next();
}
router
    .route('/:type')
    .get(contentType, type_ctrl.getAllList)
    .post(contentType, loginCheck, isAdmin,upload_path, uploader.single('image'), type_ctrl.createContent)
router
    .route('/:type/:id')
    .put(contentType, loginCheck, isAdmin,upload_path, uploader.single('image'), type_ctrl.updateContent)
    .delete(contentType, loginCheck, isAdmin, type_ctrl.deleteContent)
    .get(contentType, type_ctrl.getById)

router.get('/:type/products-list/:slug', type_ctrl.getBrandProducts)
module.exports = router 