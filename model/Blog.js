var mongoose = require('mongoose');
//var User = require('../model/Users')
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
  image: {
    // name:String,
    // image:{
    //   data:Buffer,
    //   contentType:String
    // }
    type: String,
    required: true
  },
  tag: [{
    type: String,
    required: true
  }],
  user: {
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
  }
});
module.exports = mongoose.model("Blog", blogSchema)


