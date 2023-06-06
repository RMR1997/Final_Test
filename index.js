const express = require('express')
const app = express()
const port = 3005;
const path = require("path");
const bodyParser = require("body-parser")
app.use(express.json())
require('dotenv').config()
const cookie = require(`cookie-parser`)

const siswa = require("./src/controllers/siswa")
const siswaRoutes= require("./src/routes/siswa")

const admin = require("./src/controllers/admin")
const adminRoutes= require("./src/routes/admin")

app.set("view engine" , "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({
    extended:true,
}))

app.use(cookie())
app.use(express.json())

app.use('/', adminRoutes)
app.use('/', siswaRoutes)

app.listen(port, () =>{
    console.log(`port ${port}`)
})
