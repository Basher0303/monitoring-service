const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = mongoose.model(
	"Dashboard",
	new Schema({
        name: {
            type: String,
            required: true,
        },
        roles: [{
            type: Schema.Types.ObjectId, ref: 'Role',
        }],
        options: {
            type: Object,
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
        },
	})
);