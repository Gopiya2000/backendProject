const mongoose = require("mongoose")
const followSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        require: true
    },
    follower : [{
        type : mongoose.Types.ObjectId,
        ref : 'User'
    }]
})

module.exports = mongoose.model("Follow",followSchema)