var User = require('../model/User');
var blogs = require('./blog-controller');
var profile = require('./profile-controller');
var bcrypt = require('bcryptjs');
const { validateName, validateEmail, validateUsername, validateMobile, validateDate, validatePassword, validateConfirm } = require('./Validation')
const sendToken = require('../utils/jwtToken')
require('dotenv').config()


//Signup
const signup = async (req, res, next) => {
    const { name, email, username, mobile, date, password, confirm, blogs } = req.body;
    console.log("req ", req.body)
    const nameResult = validateName(name, 1)
    const emailResult = validateEmail(email, 1)
    const usernameResult = validateUsername(username, 1)
    const mobileResult = validateMobile(mobile, 1)
    const dateResult = validateDate(date, 1)
    const passwordResult = validatePassword(password, 1)
    const confirmResult = validateConfirm(password, confirm)
    console.log(nameResult, emailResult, usernameResult, mobileResult, dateResult, passwordResult, confirmResult)

    if (nameResult == true && emailResult == true && usernameResult == true && mobileResult == true && dateResult == true && passwordResult == true && confirmResult == true) {
        let existingUser;
        try {
            let options = { abortEarly: false }
            existingUser = await User.findOne({ username });
            console.log("existing : ", existingUser)
            if (existingUser) {
                return res.status(400).json({ message: "User already exists.Login instead." })
            }
            const hashedPassword = bcrypt.hashSync(password, 12);
            const hashedConfirm = bcrypt.hashSync(confirm, 12);

            const user = new User({
                name,
                email,
                username,
                mobile,
                date,
                password: hashedPassword,
                confirm: hashedConfirm,
            });
            await user.save();
            const message = "Successfully signed in"
            console.log("object : ", user)
            sendToken(user, 201, res, message)
        }
        catch (err) {
            return res.status(404).json({ message: "Unable to add user", errors: { name: nameResult, email: emailResult, username: usernameResult, mobile: mobileResult, date: dateResult, password: passwordResult, confirm: confirmResult } })
        }

    }

};

//Login
const login = async (req, res, next) => {
    const { username, password } = req.body;
    let existingUser;
    try {
        let options = { abortEarly: false }
        existingUser = await User.findOne({ username });
    } catch (err) {
        console.log(err);
    }
    if (!existingUser) {
        return res.status(404).json({ message: "Couldn't find user by this username" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" })
    }
    const message = "Successfully logged in"
    sendToken(existingUser, 200, res, message);

}

//View the user details
const viewUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findById(id)
    } catch (err) {
        return console.log(err);
    }
    if (!user) {
        return res.status(404).json({ message: "No User found" })
    }
    return res.status(200).json({ user })
}

//Update the user details
const updateUser = async (req, res, next) => {
    const { name, email, username, mobile, date, password, confirm } = req.body;
    const nameResult = validateName(name, 1)
    const emailResult = validateEmail(email, 1)
    const usernameResult = validateUsername(username, 1)
    const mobileResult = validateMobile(mobile, 1)
    const dateResult = validateDate(date, 1)
    const passwordResult = validatePassword(password, 1)
    const confirmResult = validateConfirm(password, confirm)

    if (nameResult == true && emailResult == true && usernameResult == true && mobileResult == true && dateResult == true && passwordResult == true && confirmResult == true) {
        let user;

        let userId = req.params.id;
        console.log("userId : ", userId);
        console.log("requested : ", req.body)
        try {
            if (userId.length !== 24)
                throw "Invalid Object Id"
            user = await User.findById(userId)
            console.log("user found : ", user);
            if (user === null)
                throw "Unable to update this profile"
            let options = { abortEarly: false }
            const hashedPassword = bcrypt.hashSync(password, 12);
            const hashedConfirm = bcrypt.hashSync(confirm, 12);
            console.log("hashed password : ", hashedPassword);
            user = await User.findByIdAndUpdate(userId, {
                name,
                email,
                username,
                mobile,
                date,
                password: hashedPassword,
                confirm: hashedConfirm
            })
            await user.save()
            user = await User.findById(userId)
            console.log("user updated : ", user);
            return res.status(200).json({ user })
        }
        catch (err) {
            return res.status(404).json({ message: err.message })
        }
    }
};



module.exports = {
    signUp: signup,
    login: login,
    viewUser: viewUser,
    updateUser: updateUser
}
