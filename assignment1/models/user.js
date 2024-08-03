const { call } = require('body-parser');
const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		default: true
	}
});

const User = module.exports = mongoose.model('User', userSchema);

// Get All Users - find method
module.exports.getUsers = (callback, limit) => {
        User.find(callback).limit(limit);
}

// Get User - findById method
module.exports.getUserById = (id,callback)=>{

	User.findById(id, callback)
};

// Add User - create method
module.exports.addUser = (user, callback)=>{
	User.create(user, callback)
};

// Update User - findOneAndUpdate method
module.exports.updateUser = (id, user, settings, callback) => {
	const userObj = {_id : id}
	User.findOneAndUpdate(userObj, user, settings, callback)
};

// Delete User - deleteOne method
module.exports.removeUser = (id, callback) =>{
	const userObj = {_id : id}
	User.deleteOne(userObj, callback)
};
