const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = mongoose.model(
	"MetricCollection",
	new Schema({
		name: {
			type: String,
			required: true,
		},
        createdAt: {
            type: Date,
            required: true,
        },
	})
);