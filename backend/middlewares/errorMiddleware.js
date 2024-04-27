class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error"
    err.statusCode = err.statusCode || 500

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400)
    }

    if (err.name === "JsonWebTokenError") {
        const message = "JsonWebToken Is Invalid , Try Again!!"
        err = new ErrorHandler(message, 400)
    }

    if (err.name === "TokenExpiredError") {
        const message = "Token is Expired, Try Again!!"
        err = new ErrorHandler(message, 400)
    }

    if (err.name === "CastError") {
        const message = `Invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    const errMessage = err.errors ?
        Object.values(err.errors)
            .map((error) => error.message)
            .join(" ")
        : err.message

    return res.status(err.statusCode).json({
        success: false,
        message: errMessage
    })
}

module.exports = { errorMiddleware, ErrorHandler }