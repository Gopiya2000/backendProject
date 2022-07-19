var Profile = require('../model/Profile');
var User = require('../model/User');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
var User = require('../model/User');

//view profile
const viewProfile = async (req, res, next) => {
    try {
        let profile;
        profile = await Profile.find({ user: req.query.user });
        res.json(profile);
    }
    catch (err) {
        console.log("err", err);
    }
}

//add profile
const newProfile = async (req, res, next) => {
    const { image, bio, user } = req.body;
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
        image,
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

//update profile
const updateProfile = async (req, res, next) => {
    const { bio, image } = req.body;
    const profileID = req.params.id;
    let profile;
    try {
        profile = await Profile.findByIdAndUpdate(profileID, {
            image,
            bio
        })
        await profile.save()
        profile = await Profile.findById(profileID)
        return res.status(200).json({ profile })
    } catch (err) {
        return console.log(err);
    }
}

module.exports = {
    newProfile: newProfile,
    updateProfile: updateProfile,
    viewProfile: viewProfile
}