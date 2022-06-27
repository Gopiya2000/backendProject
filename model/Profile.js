var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  picture: {
    type: String,
    required: true
    
     //meta_data:{}

    // data:Buffer,
    // contentType:String    
  },
  bio: {
    type: String,
    required:true
    },
  user: {
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
  }
});

module.exports = mongoose.model("Profile", profileSchema);