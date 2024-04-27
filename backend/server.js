const app = require("./app")
const cloudinary = require("cloudinary")

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})

app.get('/', (req, res) => {
    res.send('Welcome to Hospital management system!')
})

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}!`)
})