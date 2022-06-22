var User = require('../model/User');
var blogs = require('./blog-controller');
var blogs = require('./profile-controller');
var bcrypt = require('bcryptjs');
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

const signup = async (req, res, next) => {
    const { name, email, username, mobile, date, password, confirm ,blogs} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ username });
    } catch (err) {
        console.log(err);
    }
    if (existingUser) {
        return res.status(400).json({ message: "User already exists.Login instead." })
    }
    if (password == confirm) {
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
            blogs:[],
            //profile:[]
        });

        try {
            await user.save();
        } catch (err) {
            return console.log(err);
        }
        return res.status(201).json({ user })
    }
    else {
        return console.log("Both Password and confirm password should be same.")
    }
};


const login = async (req, res, next) => {
    const { username, password } = req.body;
    let existingUser;
    try {
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
    return res.status(200).json({ message: "Login Successfull" })

}



module.exports = {
    getUser: getAllUser,
    signUp: signup,
    login: login
}
