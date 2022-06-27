var express = require('express');
var { getBlogs, add ,update, getById, deleteBlog , myBlog } = require('../controllers/blog-controller')
const blogRouter = express.Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/add", add);
blogRouter.put("/update/:id",update);
blogRouter.get("/:id",getById);
blogRouter.delete("/:id",deleteBlog);
blogRouter.get("/myBlog/:id",myBlog);

module.exports = blogRouter;