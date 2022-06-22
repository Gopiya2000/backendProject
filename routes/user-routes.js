var express = require('express');;
const { getUser, signUp, login } = require('../controllers/user-controller')
//const User = require('../model/User');

const router = express.Router();

router.get("/", getUser);
router.post("/signup", signUp);
router.post("/login", login);
//router.get("/login/profile",profile);
//router.post("/login/addProfile",addProfile);
//router.put("/login/updateProfile",updateProfile);

module.exports = router;