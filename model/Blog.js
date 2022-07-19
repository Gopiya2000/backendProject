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
	image: {
		type: String,
		required: true
	},
	tag: [{
		type: String,
		required: true
	}],
	user: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	}]
},
);
module.exports = mongoose.model("Blog", blogSchema)





