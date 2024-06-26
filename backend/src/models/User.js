const { Schema, model } = require("mongoose");

module.exports = model(
	"User",
	new Schema({
		email: {type: String, unique: true, required: true},
		password: {type: String, required: true},
		createdAt: {type: Date, required: true},
		isActivated: {type: Boolean, default: false},
		activationLink: {type: String},
        roles: [{type: String, ref: 'Role'}]
	})
);