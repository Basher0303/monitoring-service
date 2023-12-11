const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = mongoose.model(
	"Metric",
	new Schema({
		collectionId: {
			type: Schema.Types.ObjectId,
			ref: "MetricCollection",
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