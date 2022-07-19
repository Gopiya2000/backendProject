var express = require('express');;
const { getProfile, newProfile, updateProfile, myProfile, viewProfile } = require('../controllers/profile-controller')
const isAuthenticatedUser = require('../middlewares/auth')
const profileRouter = express.Router();

profileRouter.post("/add-profile", newProfile);
profileRouter.get("/", viewProfile);
profileRouter.put("/update-profile/:id", updateProfile);

module.exports = profileRouter;