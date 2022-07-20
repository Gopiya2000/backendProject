var express = require('express');;
const { getUser, signUp, login, viewUser, updateUser, deleteUser ,getAllUser} = require('../controllers/user-controller')

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/",getAllUser)
router.get("/:id", viewUser);
router.put("/details/:id", updateUser);

module.exports = router;