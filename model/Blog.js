var mongoose = require('mongoose');
//var ObjectId = require('mongoose').ObjectId;

var User = require('../model/User')
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image:{
      publicId: {
      type: String
      }
      ,
      url: {
      type: String,
      required: true,
      },
},
  tag: [{
    type: String,
    required: true
  }],
  // comment: {
  //   type: String,
  // },
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
 },
// {
//   timestamps: true,
// }
);
module.exports = mongoose.model("Blog", blogSchema)





