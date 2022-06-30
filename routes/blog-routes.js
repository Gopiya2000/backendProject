var express = require('express');
var { getBlogs, add ,update, getById, deleteBlog , myBlog } = require('../controllers/blog-controller')
const isAuthenticatedUser = require('../middlewares/auth')
const blogRouter = express.Router();

blogRouter.get("/", isAuthenticatedUser, getBlogs);
blogRouter.post("/add", isAuthenticatedUser, add);
blogRouter.put("/update/:id", isAuthenticatedUser,update);
blogRouter.get("/:id", isAuthenticatedUser,getById);
blogRouter.delete("/:id", isAuthenticatedUser,deleteBlog);
blogRouter.get("/myBlog/:id", isAuthenticatedUser,myBlog);

module.exports = blogRouter;