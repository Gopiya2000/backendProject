var Profile = require('../model/Profile');
var User = require('../model/User');
const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const path = require ('path');
const multer = require ('multer');
var User = require('../model/User');
// const model = require("./model")
// const File = mongoose.model("file");
// const multer = require("multer");



// const storage = multer.diskStorage({
//     destination: "./public/",
//     filename: function(req, file, cb){
//        cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//     }
//  });
 
//  const upload = multer({
//     storage: storage,
//     limits:{fileSize: 1000000},
//  }).single("myfile");
 
//  const obj =(req,res) => {
//     upload(req, res, () => {
//        console.log("Request ---", req.body);
//        console.log("Request file ---", req.file);//Here you get file.
//        const file = new File();
//        file.meta_data = req.file;
//        file.save().then(()=>{
//        res.send({message:"uploaded successfully"})
//        })
//        /*Now do where ever you want to do*/
//     });
//  }

// storage engine for multer
// const storageEngine = multer.diskStorage ({
//     destination: './public/uploads/',
//     filename: function (reSavitha3423q, file, callback) {
//       callback (
//         null,
//         file.fieldname + '-' + Date.now () + path.extname (file.originalname)
//       );
//     },
//   });
// // file filter for multer
// const fileFilter = (req, file, callback) => {
//     let pattern = /jpg|png/; // reqex
  
//     if (pattern.test (path.extname (file.originalname))) {
//       callback (null, true);
//     } else {
//       callback ('Error: not a valid file');
//     }
//   };
// // initialize multer
// const upload = multer ({
//     storage: storageEngine,
//     fileFilter  
//   });

//   // routing
//   const uploadFile = (req,res) => {
//     try{
//         console.log(req.file)
//         res.json (req.file).status (200)
//     }
//     catch(err){
//         return console.log(err);
//     }
//   }

      

const getProfile = async (req, res, next) => {
    const { bio,user} = req.body;
    let profile;
    try {
        profile = await Profile.findOne(user);
    } catch (err) {
        console.log(err);
    }
    if (!profile) {
        return res.status(404).json({ message: "No profile found " });
    }
    return res.status(200).json({ profile });
};

const viewProfile=async(req,res,next)=>{
    try{
        let profile;
        console.log(req.query.user)
         profile = await Profile.find({user:req.query.user});//,{bio:1}
         res.json(profile);
        //console.log(Profile.find({user:req.query.user}))
    }
    catch(err){
        console.log("err",err);
    }
}

const newProfile = async (req, res, next) => {
    const { bio,user} = req.body;
    console.log("bio",req.body)
    let existingProfile;
    try {
        existingProfile = await Profile.findOne({ bio });
    } catch (err) {
        console.log(err);
    }
    if (existingProfile) {
        return res.status(400).json({ message: "Profile already created" })
    }
        const profile = new Profile({
            //picture:upload.single ('uploadedFile'),
            bio,
            user
        });
  
        try {
            await profile.save();
        } catch (err) {
            return console.log(err);
        }
        return res.status(201).json({ profile })
    };

    // const updateProfile = async (req,res,next) => {
    //     const {bio } = req.body;
    //     const profileID = req.params.id;
    //     let profile;
    //     try{
    //         };ofile = await Profile.findByIdAndUpdate(profileID,{
    //             picture,
    //             bio
    //          })
    //     }catch(err){
    //         return console.log(err);
    //     }
    //   if(!profile) {
    //     return res.status(500).json({message:"Unable to update the profile"})
    //   }  
    //   return res.status(200).json({ profile })
    // };
    const updateProfile = async (req,res,next) => {
        const {bio } = req.body;
        const profileID = req.params.id;
        console.log("profile id",req.params.id);
        let profile;
        try{
            profile = await Profile.findByIdAndUpdate(profileID,{
                //picture,
                bio
             })
             await profile.save()
             profile = await Profile.findById(profileID)
                    console.log("profile updated : ",profile);
                    return res.status(200).json({profile})
        }catch(err){
            return console.log(err);
        }
    //   if(!profile) {
    //     return res.status(500).json({message:"Unable to update the profile"})
    //   }  
    //   return res.status(200).json({ profile })
    }

    const myProfile = async (req,res,next) => {
      const user = req.params.id;
      let profile;
      try{
          profile = await Profile.find({user})
      }catch(err){
          return console.log(err);
      }
      if(!profile){
          return res.status(404).json({message:"No Profile found"})
      }
      return res.status(200).json({profile})
  }

    module.exports = {
        getProfile: getProfile,
        newProfile: newProfile,
        updateProfile:updateProfile,
        myProfile:myProfile,
        viewProfile:viewProfile
    }