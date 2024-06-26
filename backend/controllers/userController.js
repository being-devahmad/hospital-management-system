const catchAsyncErrors = require("../middlewares/catchAsyncError")
const { ErrorHandler } = require("../middlewares/errorMiddleware")
const User = require("../models/userSchema")
const { generateToken } = require("../utils/jwt")

const patientRgister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, cnic, dob, password, gender, role } = req.body

    if (!firstName || !lastName || !email || !phone || !cnic || !dob || !password || !role || !gender) {
        return next(new ErrorHandler("Please fill full form", 400))
    }


    let user = await User.findOne({ email })

    if (user) {
        return next(new ErrorHandler("User already registered", 400))
    }

    user = await User.create({ firstName, lastName, email, phone, cnic, dob, password, gender, role })

    generateToken(user, "User Registered Successfully", 200, res)

    // res.status(200).json({
    //     success: true,
    //     message: "User Registered Successfully"
    // })
})

const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body

    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Provide All Details", 400))
    }

    if (password !== confirmPassword) {
        return next(new ErrorHandler("Passwords doesn't match", 400))
    }

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Invalid email or password !", 400))
    }

    const isPasswordMatched = await user.comparePassword(password)
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password !", 400))
    }

    if (role !== user.role) {
        return next(new ErrorHandler("User not found!", 400))
    }

    generateToken(user, "User LoggedIn Successfully", 200, res)

    // res.status(200).json({
    //     success: true,
    //     message: "User LoggedIn Successfully"
    // })
})


const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, cnic, dob, password, gender } = req.body

    if (!firstName || !lastName || !email || !phone || !cnic || !dob || !password || !gender) {
        return next(new ErrorHandler("Please fill full form", 400))
    }

    let isRegistered = await User.findOne({ email })

    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists`, 400))
    }

    const admin = await User.create({ firstName, lastName, email, phone, cnic, dob, password, gender, role: "Admin" })
    res.status(200).json({
        success: true,
        message: "Admin Registered Successfully"
    })
})


const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" })
    res.status(200).json({
        success: true,
        doctors
    })
})

const getUserDetails = catchAsyncErrors(async (req, res) => {
    const user = req.user
    res.status(200).json({
        success: true,
        user
    })
})

const logoutAdmin = catchAsyncErrors(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Admin Logged Out Successfully"
    })
})

module.exports = { patientRgister, loginUser, addNewAdmin, getAllDoctors, getUserDetails, logoutAdmin }