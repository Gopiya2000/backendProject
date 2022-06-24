var Profile = require('../model/Profile');
var User = require('../model/User');
const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const path = require ('path');
const multer = require ('multer');
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
const storageEngine = multer.diskStorage ({
    destination: './public/uploads/',
    filename: function (req, file, callback) {
      callback (
        null,
        file.fieldname + '-' + Date.now () + path.extname (file.originalname)
      );
    },
  });
// file filter for multer
const fileFilter = (req, file, callback) => {
    let pattern = /jpg|png/; // reqex
  
    if (pattern.test (path.extname (file.originalname))) {
      callback (null, true);
    } else {
      callback ('Error: not a valid file');
    }
  };
// initialize multer
const upload = multer ({
    storage: storageEngine,
    fileFilter  
  });

  // routing
  const uploadFile = (req,res) => {
    try{
        console.log(req.file)
        res.json (req.file).status (200)
    }
    catch(err){
        return console.log(err);
    }
  }

      

const getProfile = async (req, res, next) => {
    let profile;
    try {
        profile = await Profile.find();
    } catch (err) {
        console.log(err);
    }
    if (!profile) {
        return res.status(404).json({ message: "No profile found " });
    }
    return res.status(200).json({ profile });
};

const newProfile = async (req, res, next) => {
    const { picture,bio,user } = req.body;

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
            picture:upload.single ('uploadedFile'),
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

    const updateProfile = async (req,res,next) => {
        const {picture,bio } = req.body;
        const profileID = req.params.id;
        let profile;
        try{
            profile = await Profile.findByIdAndUpdate(profileID,{
                picture,
                bio
             })
        }catch(err){
            return console.log(err);
        }
      if(!profile) {
        return res.status(500).json({message:"Unable to update the profile"})
      }  
      return res.status(200).json({ profile })
    };

    module.exports = {
        getProfile: getProfile,
        newProfile: newProfile,
        updateProfile:updateProfile
    }