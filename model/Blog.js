var mongoose = require('mongoose');

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
    type : String,
    required : true
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
  // ,
  // createdAt: {
  //   type: Date,
  //   default: new Date(),
  // }
 },
// {
//   timestamps: true,
// }
);
module.exports = mongoose.model("Blog", blogSchema)





