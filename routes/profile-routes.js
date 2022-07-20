var express = require('express');;
const { getProfile, newProfile, updateProfile, myProfile,getAllProfile, viewProfile } = require('../controllers/profile-controller')

const profileRouter = express.Router();

profileRouter.get("/all",getAllProfile);
profileRouter.post("/add-profile", newProfile);
profileRouter.get("/", viewProfile);
profileRouter.put("/update-profile/:id", updateProfile);

module.exports = profileRouter;