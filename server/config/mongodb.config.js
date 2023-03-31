const mongoose = require("mongoose")
const Config = require("./config")

mongoose.connect(Config.MONGO_URL)
    .then((res) => {
        console.log("Db connected")
    })
    .catch((error) => {
        console.log("Error:", error)
    })
    