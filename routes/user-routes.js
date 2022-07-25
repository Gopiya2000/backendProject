var express = require('express');const { viewFollowers } = require('../controllers/follow-controller');
;
const { getUser, signUp, login, viewUser, updateUser, deleteUser ,getAllUser, addMyFollower} = require('../controllers/user-controller')

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/",getAllUser)
router.get("/:id", viewUser);
router.put("/details/:id", updateUser);
router.post("/my-followers", addMyFollower)
router.get("/:userId/followings",viewFollowers)

module.exports = router;