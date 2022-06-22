var express = require('express');;
const { getProfile,newProfile ,updateProfile} = require('../controllers/profile-controller')
//const User = require('../model/User');

const profileRouter = express.Router();

  
profileRouter.get("/",getProfile);
profileRouter.post("/addProfile",newProfile);
profileRouter.put("/updateProfile/:id",updateProfile);

module.exports = profileRouter;