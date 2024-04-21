const { Schema, model } = require("mongoose");

module.exports = model(
	"Role",
	new Schema({
		name: {
			type: String, 
			unique: true, 
			required: true
		},
		createdAt: {
            type: Date,
            required: true,
        },
	})
);