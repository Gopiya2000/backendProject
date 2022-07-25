const Follow = require("../model/Follow")

// const follow = async (req,res) => {
//     try{
//         const userId = req.body.user
//         const profileId = req.body.profile
//         let data = await Follow.findOne({userId:userId,profileId:profileId})
//         if(data)
//         {
//             data = await Follow.findByIdAndUpdate(data._id)
//             const follow = await data.save();
//             res.send(follow)
//         }
//         else{
//             let follow = new Follow({
//                 userId:req.body.user,
//                 profileId:req.body.profile
//             })
//             let data = await follow.save()
//             res.send(data)
//         }
//     }
//     catch(error){
//         res.send("error:",error)
//     }
// }

// const getAllFollow = async (req,res) => {
//     const id = req.params.id;
//     try{
//         const data = await Follow.find({userId:id})
//         .populate("profile")
//         res.json({follow:data});
//     }
//     catch{
//         console.log("error :",error)
//     }
// }

// const deleteFollow = async(req,res) => {
//     const id = req.params.id;
//     try{
//         const data =  await Follow.deleteOne({userId:id})
//     }
//     catch{
//         console.log("error :",error)
//     }
// }

const viewFollowers = async(req, res) => {
    const userId = req.params.userId
    console.log("received user id : ",userId)
    try {
        const followers = await Follow.findOne({user : userId}).populate({path : 'follower'})
        return res.status(200).json({followers})
    }
    catch(error){

    }
}

module.exports = {
    // follow : follow,
    // getAllFollow : getAllFollow,
    // deleteFollow : deleteFollow,
    viewFollowers : viewFollowers
}