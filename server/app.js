const express= require("express")
const cors= require("cors")
const app = express()
const PORT = 8000 || process.env.PORT
app.use(cors())
require('dotenv').config()
//DB Connect
require("./config/mongodb.config")

app.use("/images", express.static(process.cwd() + "/public/uploads/"))

//Middleware
const routes = require("./routes/")

//static middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//Routing
app.use("/api/v1", routes);
// 404 request
app.use((req, res, next) => {
    next({ status: 404,
           msg: "Resource not found"
        });
});

// error handling middleware
app.use((error, req, res, next) => {
    let status_code= error.status || 500;
    let msg = error.msg ?? error; 

    res.status(status_code).json({
        result: null,
        status: false,
        msg: msg
    });
});

app.listen(PORT, 'localhost', (err) => {
    if(!err){
        console.log("Server is running on port: "+PORT)
    }
})
