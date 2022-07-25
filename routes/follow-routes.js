const express = require("express")
const {follow,getAllFollow,deleteFollow, viewFollowers} = require("../controllers/follow-controller")

const followRoute = express.Router();

// followRoute.post("/follow",follow)
followRoute.get("/:userId/followings",viewFollowers)
// followRoute.delete("/:id",deleteFollow)

module.exports = followRoute;