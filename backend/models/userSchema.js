const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
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
        minLength: [11, "Phone No Must Contain 11 Digits"],
        maxLength: [11, "Phone No Must Contain 11 Digits"]
    },
    cnic: {
        type: String,
        required: true,
        maxLength: [13, "CNIC Must Contain 13 Digits"],
        minLength: [13, "CNIC Must Contain 13 Digits"]
    },
    dob: {
        type: Date,
        required: [true, "DOB is required"],
        set: function (dob) {
            // Assuming dob is in the format "DD/MM/YYYY"
            const parts = dob.split('/');
            return new Date(parts[2], parts[1] - 1, parts[0]); // Year, month (0-indexed), day
        }
    },
    gender: {
        type: String,
        required: true,
        anum: ["Male", "Female"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password Must Contain 8 Characters"],
        select: false
    },
    role: {
        type: String,
        required: true,
        anum: ["Admin", "Patient", "Doctor"]
    },
    doctorDepartment: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
    next();
});


userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign(
        { id: this._id }, // id
        process.env.JWT_SECRET_KEY, // secret key
        { expiresIn: process.env.JWT_EXPIRES } // expiry
    )
}

const User = mongoose.model('User', userSchema)
module.exports = User