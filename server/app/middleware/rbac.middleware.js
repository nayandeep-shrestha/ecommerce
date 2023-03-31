const isAdmin = (req, res, next) => {
    let role = req.auth_user.role
    if(role === "admin"){
        next()
    }else{
        next({status: 403, msg:"Unauthorized access"})
    }
}
const isAdminSeller = (req, res, next) => {
    let role = req.auth_user.role
    if(role === "admin" || role === "seller"){
        next()
    }else{
        next({status: 403, msg:"Unauthorized access"})
    }
}
const isCustomer = (req, res, next) => {
    let role = req.auth_user.role
    if(role === "customer"){
        next()
    }else{
        next({status: 403, msg:"Unauthorized access"})
    }
}
const isSeller = (req, res, next) => {
    let role = req.auth_user.role
    if(role === "seller"){
        next()
    }else{
        next({status: 403, msg:"Unauthorized access"})
    }
}

module.exports = {
    isAdmin,
    isAdminSeller,
    isCustomer,
    isSeller
}