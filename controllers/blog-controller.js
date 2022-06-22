// const multer = require("multer");
// const fs = require('fs');
const mongoose = require("mongoose");
const Blog = require("../model/Blog");
//const user = require("./user-controller");
var User = require('../model/User');

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

const addBlog = async (req, res, next) => {
    const { title, content, image, tag ,user} = req.body;
    let existingUser;
    try{
        existingUser = await User.findById(user);
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(500).json({message:"Unable to find the user by this Id."})
    }
    const blog = new Blog({
        title,
        content,
        image,
        tag,
        postedBy
    });
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
        return res.status(500).json({message: err})
    }
    return res.status(200).json({ blog })
};

const updateBlog = async (req,res,next) => {
    const {title, content, image, tag } = req.body;
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            content,
            image,
            tag
         })
    }catch(err){
        return console.log(err);
    }
  if(!blog) {
    return res.status(500).json({message:"Unable to update the blog"})
  }  
  return res.status(200).json({blog})
};

const getById = async (req,res,next) => {
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(id)
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({message:"No Blogs found"})
    }
    return res.status(200).json({blog})
}

const deleteBlog = async(req,res,next) => {
    const id = req.params.id;
    let blog;
    try{
       blog = await Blog.findByIdAndRemove(id);
    }
    catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"Unable to delete"})
    }
    return res.status(200).json({message:"Successfully deleted"})
}

module.exports = {
    getBlogs: getAllBlogs,
    add: addBlog,
    update: updateBlog,
    myBlog: getById,
    deleteBlog: deleteBlog
}