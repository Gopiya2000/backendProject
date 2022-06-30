var express = require('express');
var mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config()
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
app.use(cookieParser())
app.use(cors("http://localhost:3000"));
app.use(express.json());
// app.use(express.static('public'));

app.use("/api/user", router);
app.use("/api/blog", blogRouter);
app.use("/api/profile", profileRouter);

// mongoose.connect("mongodb+srv://gopiya:pG3OxWsIfCllETX4@cluster0.tzaeypf.mongodb.net/BlogWebsite?retryWrites=true&w=majority")
// .then(() => app.listen(4567))
// .then(() =>
//     console.log("Connected to the Database and listening to localhost 4567")
// )
// .catch((err) => console.log(err));


mongoose.connect(process.env.DATABASE_CONNECT_STRING)
.then(() => {
    console.log("Connected to Database")
})
.then(() => {
    console.log(`Server is running on port : ${process.env.PORT_NUMBER}`)
    app.listen(4567)})
.catch(err => console.log("Error in connecting to database, error : " ,err.message))
