const mongoose = require('mongoose')
const validator = require("validator")

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At least 3 Characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At least 3 Characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide A Valid Email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [11, "Phone No Must Contain 11 Digits"]
    },
    message: {
        type: String,
        required: true,
        minLength: [10, "Mesage No Must Contain At Least 10 Characters"]
    },
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message