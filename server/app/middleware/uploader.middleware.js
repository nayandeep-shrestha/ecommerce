const fs= require("fs")
//multer ----> for file uploading
const multer= require("multer")
const diskStore = multer.diskStorage({
    destination: (req,file,cb) => {
        fs.mkdirSync(req.upload_path, {recursive: true})
        cb(null, req.upload_path);
    },
    filename: (req, file,cb) => {
        let file_name= Date.now() + file.originalname;
        cb(null, file_name)
    }
})
const imgFilter = (req, file,cb) =>{
    let ext = (file.originalname.split(".")).pop()
    if(["jpeg","jpg","gif","png","webp","svg", "bmp"].includes(ext.toLowerCase())){
        cb(null, true)
    }else{
        cb({status:400, msg:"Invalid image format"}, null)
    }
}
const uploader = multer({
    storage: diskStore,
    fileFilter: imgFilter,
    limits: {
        fileSize: 1000000 
    }
})

module.exports =uploader