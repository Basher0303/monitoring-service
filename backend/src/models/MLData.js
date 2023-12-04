const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = mongoose.model(
	"MLData",
	new Schema({
		name: {
			type: String,
			required: true,
		},
		value: {
			type: Number,
			required: true,
		},
        createdAt: {
            type: Date,
            required: true,
        },
	})
);