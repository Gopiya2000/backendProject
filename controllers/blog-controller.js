const multer = require("multer");
// const fs = require('fs');
const mongoose = require("mongoose");
const Blog = require("../model/Blog");
//const user = require("./user-controller");
var User = require('../model/User');
const cloudinary = require('cloudinary')

const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (err) {
        return console.log(err);
    }
    if (!blogs) {
        return res.status(404).json({ message: "No blogs found" })
    }
    return res.status(200).json({ blogs })
}

// const storage = multer.diskStorage({
//     destination:(req,file,callback) => {
//     callback(null,'uploads')
//     },
//     filename:(req,file,callback) => {
//     callback(null,file.originalname)
//     }
// })

// const upload = multer({storage:storage})

// // storage engine for multer
// const storageEngine = multer.diskStorage ({
//     destination: './public/uploads/',
//     filename: function (req, file, callback) {
//       callback (
//         null,
//         file.fieldname + '-' + Date.now () + path.extname (file.originalname)
//       );
//     },
//   });
// // file filter for multer
// const fileFilter = (req, file, callback) => {
//     let pattern = /jpg|png/; // reqex

//     if (pattern.test (path.extname (file.originalname))) {
//       callback (null, true);
//     } else {
//       callback ('Error: not a valid file');
//     }
//   };
// // initialize multer
// const upload = multer ({
//     storage: storageEngine,
//     fileFilter  
//   });

//   // routing
//   const uploadFile = (req,res) => {
//     try{
//         console.log(req.file)
//         res.json (req.file).status (200)
//     }
//     catch(err){
//         return console.log(err);
//     }
//   }



const addBlog = async (req, res, next) => {
    console.log(typeof(JSON.stringify(req.body.image)));
    console.log("req",req.body);
        const myCloud =  cloudinary.v2.uploader.upload(JSON.stringify(req.body.image), {
        folder: "blogs",
        width: 150
    })
// catch(err){
//       console.log(err);
// };
    const { title, content, image, tag, user } = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(500).json({ message: "Unable to find the user by this Id." })
    }
    const blog = new Blog({
        title,
        content,
        image:{
            publicId:image.publicId,
            url: image.url
        },
        //: upload.single ('uploadedFile'),
        tag,
        user
    })

    try {
        await blog.save();

        // const session = await mongoose.startSession();
        // session.startTransaction();
        // await blog.save({session});
        // existingUser.blogs.push(blog);
        // await existingUser.save({session})
        // await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err })
    }
    return res.status(200).json({ blog })
};

//id:blog unique id
const updateBlog = async (req, res, next) => {
    const { title, content, image, tag } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            content,
            //image,
            tag
        })
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable to update the blog" })
    }
    return res.status(200).json({ blog })
};

const getById = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id)
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "No Blogs found" })
    }
    return res.status(200).json({ blog })
}

const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id);
    }
    catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable to delete" })
    }
    return res.status(200).json({ message: "Successfully deleted" })
}

const myBlog = async (req, res, next) => {
    const user = req.params.id;
    //console.log(user);
    let blog;
    try {
        blog = await Blog.find({ user })
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "No Blogs found" })
    }
    return res.status(200).json({ blog })
}

module.exports = {
    getBlogs: getAllBlogs,
    add: addBlog,
    update: updateBlog,
    getById: getById,
    deleteBlog: deleteBlog,
    myBlog: myBlog
}