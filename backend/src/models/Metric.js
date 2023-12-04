const mongoose = require("mongoose");
const { Schema } = mongoose;

// Создание схемы для объекта значения в массиве
const valueSchema = new mongoose.Schema({
    value: { type: String, required: true, }, 
    createdAt: { type: Date, required: true, },
    updatedAt: { type: Date, required: true, } 
});

module.exports = mongoose.model(
	"Metric",
	new Schema({
		name: {
			type: String,
			required: true,
		},
		values: [valueSchema],
        createdAt: {
            type: Date,
            required: true,
        },
	})
);