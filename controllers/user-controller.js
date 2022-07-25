var bcrypt = require('bcryptjs');
require('dotenv').config()
var User = require('../model/User');
const { validateName, validateEmail, validateUsername, validateMobile, validateDate, validatePassword, validateConfirm } = require('./Validation')
const sendToken = require('../utils/jwtToken');
const Follow = require('../model/Follow');

//Signup
const signup = async (req, res, next) => {

    const { name, email, username, mobile, date, password, confirm, blogs } = req.body;
    const nameResult = validateName(name, 1)
    const emailResult = validateEmail(email, 1)
    const usernameResult = validateUsername(username, 1)
    const mobileResult = validateMobile(mobile, 1)
    const dateResult = validateDate(date, 1)
    const passwordResult = validatePassword(password, 1)
    const confirmResult = validateConfirm(password, confirm)

    if (nameResult == true && emailResult == true && usernameResult == true && mobileResult == true && dateResult == true && passwordResult == true && confirmResult == true) {
        let existingUser;
        try {
            let options = { abortEarly: false }
            existingUser = await User.findOne({ username });
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

//Get all users
const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({ message: "No Users found " });
    }
    return res.status(200).json({ users });
};

//View the user details
const viewUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findById(id).populate({path :'follower'})
        console.log("users details : ",user)
        
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
        try {
            if (userId.length !== 24)
                throw "Invalid Object Id"
            user = await User.findById(userId)
            if (user === null)
                throw "Unable to update this profile"
            let options = { abortEarly: false }
            const hashedPassword = bcrypt.hashSync(password, 12);
            const hashedConfirm = bcrypt.hashSync(confirm, 12);
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
            return res.status(200).json({ user })
        }
        catch (err) {
            return res.status(404).json({ message: err.message })
        }
    }
};

/**My Followers */
const addMyFollower = async(req, res) => {
    const {followerId, userId} = req.body
    let followDetails
    console.log("req : ",req.body)
    try{
        const userFound = await Follow.find({user : userId})
        console.log("user found : ",userFound)
        if(userFound)
        {
            await Follow.updateOne({user : userId}, {$push : {follower : followerId}})
        }
        else
        {
            followDetails = new Follow({
            user : userId,
            follower : followerId
             })
        await followDetails.save()
        }
        return res.status(201).json({ message : 'succesfully follower has been added to the profile '})
    }
    catch(error){
        console.log("error : ",error.message)
    }

}

module.exports = {
    signUp: signup,
    login: login,
    getAllUser : getAllUser,
    viewUser: viewUser,
    updateUser: updateUser,
    addMyFollower
}
