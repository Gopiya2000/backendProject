const multer = require("multer");
const mongoose = require("mongoose");
const Blog = require("../model/Blog");
var User = require('../model/User');
const cloudinary = require('cloudinary');
const Profile = require('../model/Profile')

//view all blogs of all user
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

//add a new blog
const addBlog = async (req, res, next) => {
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
        image,
        tag,
        user
    })

    try {
        await blog.save();
    } catch (err) {
        return res.status(500).json({ message: err })
    }
    return res.status(200).json({ blog })
};

//id:blog unique id  to update blog
const updateBlog = async (req, res, next) => {
    const { title, content, image, tag } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            content,
            image,
            tag
        })
        await blog.save()
        blog = await Blog.findById(blogId)
        return res.status(200).json({ blog })
    } catch (err) {
        return console.log(err);
    }
};

//get users blogs
const getById = async (req, res, next) => {
    const userId = req.params.id;
    let blog;
    try {
        blog = await Blog.find({ user: userId })
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "No Blogs found" })
    }
    return res.status(200).json({ blog })
}

//get a single blog
const singleBlog = async (req, res, next) => {
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

//delete the blog
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


module.exports = {
    getBlogs: getAllBlogs,
    add: addBlog,
    update: updateBlog,
    myBlogs: getById,
    deleteBlog: deleteBlog,
    singleBlog: singleBlog
}