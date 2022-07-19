var express = require('express');
var mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload')
const multer = require('multer');
const cloudinary = require('cloudinary');

const router = require('./routes/user-routes');
const blogRouter = require('./routes/blog-routes');
const profileRouter = require('./routes/profile-routes');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors("http://localhost:9500"));
app.use(express.json());
app.use(fileUpload({ userTempFiles: true }))

app.use("/api/user", router);
app.use("/api/blog", blogRouter);
app.use("/api/profile", profileRouter);

cloudinary.config({

    cloud_name: process.env.CLOUD_NAME,

    api_key: process.env.API_KEY,

    api_secret: process.env.API_SECRET,

});

mongoose.connect(process.env.DATABASE_CONNECT_STRING)
    .then(() => {
        console.log("Connected to Database")
    })
    .then(() => {
        console.log(`Server is running on port : ${process.env.PORT_NUMBER}`)
        app.listen(4567)
    })
    .catch(err => console.log("Error in connecting to database, error : ", err.message))
