const express = require('express');
const { config } = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const dbConnection = require('./database/dbConnection');

const messageRouter = require("./routers/messageRouter");
const userRouter = require("./routers/userRouter");
const { errorMiddleware } = require('./middlewares/errorMiddleware');

const app = express()
config({ path: "./config/config.env" })

// Cors
app.use(
    cors({
        origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

// Routers
app.use("/api/v1/message", messageRouter)
app.use("/api/v1/user", userRouter)

dbConnection()

app.use(errorMiddleware)
module.exports = app