var express = require('express');;
const { getProfile,newProfile ,updateProfile,myProfile} = require('../controllers/profile-controller')
//const User = require('../model/User');

const profileRouter = express.Router();

  
profileRouter.get("/",getProfile);
profileRouter.post("/addProfile",newProfile);
profileRouter.put("/updateProfile/:id",updateProfile);
profileRouter.get("/myProfile/:id",myProfile);

module.exports = profileRouter;