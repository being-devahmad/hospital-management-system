const mongoose = require("mongoose")

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "HOSPITAL_MANAGEMENT_SYSTEM"
    }).then(() => {
        console.log("connected to database")
    }).catch((err) => {
        console.log("error connecting to database ", err)
    })
}

module.exports = dbConnection