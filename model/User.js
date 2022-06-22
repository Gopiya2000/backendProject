var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    confirm: {
        type: String,
        required: true
    },
    // picture: {
    //     type: String,
    //     required: true
    //   },
    //   bio: {
    //     type: String,
    //     required:true
    //   },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"Blog",
        required:true
}]
});

// //Secure Password
// userSchema.pre('save',async(next) => {
//     if(this.isModified('Password')){
//         this.Password = bcrypt.hash(this.Password,12)
//         this.Confirm = bcrypt.hash(this.Confirm,12)
//     }
//     next();
// }
// )

// userSchema.methods.pre('save',(next) => {
//     if(this.isModified('Password')){
//         bcrypt.hash(this.Password,8,(err,hash) => {
//             if(err) return next(err);
//             this.Password = hash;
//             next();
//         });
//     }
// });

module.exports = mongoose.model("User", userSchema);

