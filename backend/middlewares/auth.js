const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const User = require("../models/userSchema");
const { ErrorHandler } = require("./errorMiddleware");

const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;
    console.log(token)

    if (!token) {
        return next(new ErrorHandler("Admin Not Authenticated", 400))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    console.log(decoded)

    req.user = await User.findById(decoded.id)

    // if we remove below this whole part from line 20 to line 27 , then this whole is authentication only otherwise it's both authentication and authorization

    if (req.user.role !== "Admin") {
        return next(
            new ErrorHandler(
                `${req.user.role} is not authorized for this resource !`,
                403))
    }
    next();
})

const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;
    console.log(token)

    if (!token) {
        return next(new ErrorHandler("Patient Not Authenticated", 400))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    console.log(decoded)

    req.user = await User.findById(decoded.id)

    // if we remove below this whole part from line 20 to line 27 , then this whole is authentication only otherwise it's both authentication and authorization

    if (req.user.role !== "patient") {
        return next(
            new ErrorHandler(
                `${req.user.role} is not authorized for this resource !`,
                403))
    }
    next();
})

module.exports = { isAdminAuthenticated, isPatientAuthenticated }