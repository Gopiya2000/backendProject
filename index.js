var express = require('express');
var mongoose = require('mongoose');
//var bodyParser = require('body-parser');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const path = require ('path');
const multer = require ('multer');

const router = require('./routes/user-routes');
const blogRouter = require('./routes/blog-routes');
const profileRouter = require('./routes/profile-routes');
const app = express();
// middleware
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true}));
app.use (cors ());
app.use(express.json());
// app.use(express.static('public'));

app.use("/api/user", router);
app.use("/api/blog", blogRouter);
app.use("/api/login/profile", profileRouter);

mongoose.connect('mongodb://0.0.0.0:27017/Blog')
    .then(() => app.listen(5000))
    .then(() =>
        console.log("Connected to the Database and listening to localhost 5000")
    )
    .catch((err) => console.log(err));
