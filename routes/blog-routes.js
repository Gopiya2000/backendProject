var express = require('express');
var { getBlogs, add, update, myBlogs, deleteBlog, singleBlog } = require('../controllers/blog-controller')
const isAuthenticatedUser = require('../middlewares/auth')
const blogRouter = express.Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/add", add);
blogRouter.put("/update/:id", update);
blogRouter.get("/:id", myBlogs);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/single/:id", singleBlog);

module.exports = blogRouter;