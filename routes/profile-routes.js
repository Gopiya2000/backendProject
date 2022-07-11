var express = require('express');;
const { getProfile,newProfile ,updateProfile,myProfile,viewProfile} = require('../controllers/profile-controller')
//const User = require('../model/User');
const isAuthenticatedUser = require('../middlewares/auth')

const profileRouter = express.Router();

  
profileRouter.get("/myProfile/:id", isAuthenticatedUser,myProfile);
profileRouter.get("/myProfile",getProfile);
profileRouter.post("/addProfile",newProfile);

profileRouter.get("/",viewProfile);
profileRouter.put("/updateProfile/:id",updateProfile);

module.exports = profileRouter;