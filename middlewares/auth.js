const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require ('../model/User')


const isAuthenticatedUser = async (req, res, next) => {
    const { token }  = req.cookies;
    console.log("req/cookies:",req.cookies)
    console.log("token",token)
    try{
        if (!token) 
        throw "You dont have access to this page , please login"
        const decodedData = jwt.verify(token, process.env.SECRET_KEY)
        req.user = await User.findById(decodedData.id)
        console.log("verified")
        next()
    }
    catch(err){
      return res.status(401).json({errorMessage : err})
    }
}

module.exports = isAuthenticatedUser

