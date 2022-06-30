var express = require('express');;
const { getProfile,newProfile ,updateProfile,myProfile} = require('../controllers/profile-controller')
//const User = require('../model/User');
const isAuthenticatedUser = require('../middlewares/auth')

const profileRouter = express.Router();

  
profileRouter.get("/", isAuthenticatedUser,getProfile);
profileRouter.post("/addProfile", isAuthenticatedUser,newProfile);
profileRouter.put("/updateProfile/:id", isAuthenticatedUser,updateProfile);
profileRouter.get("/myProfile/:id", isAuthenticatedUser,myProfile);

module.exports = profileRouter;