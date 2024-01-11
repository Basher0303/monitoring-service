const { Schema, model } = require("mongoose");

module.exports = model(
	"Token",
	new Schema({
		user: {type: Schema.Types.ObjectId, ref: 'User'},
		refreshToken: {type: String, required: true},
	})
);