const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = mongoose.model(
	"Dashboard",
	new Schema({
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