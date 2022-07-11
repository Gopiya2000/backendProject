var express = require('express');;
const { getUser, signUp, login,viewUser,updateUser ,deleteUser} = require('../controllers/user-controller')
//const User = require('../model/User');

const router = express.Router();

router.get("/", getUser);
router.post("/signup", signUp);
router.post("/login", login);
router.get("/:id",viewUser);
router.put("/details/:id",updateUser);
router.delete('/:id',deleteUser);

module.exports = router;