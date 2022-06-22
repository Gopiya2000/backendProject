var express = require('express');
var { getBlogs, add ,update, myBlog, deleteBlog } = require('../controllers/blog-controller')
const blogRouter = express.Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/add", add);
blogRouter.put("/update/:id",update);
blogRouter.get("/:id",myBlog);
blogRouter.delete("/:id",deleteBlog);

module.exports = blogRouter;