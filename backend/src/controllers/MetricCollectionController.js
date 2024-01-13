const { MetricCollection } = require("../models");
const { RequestHandler } = require("express");


class MetricCollectionDTO {
	/**
    * @param {string} id 
    * @param {string} name 
    * @param {Date} createdAt 
    * @param {number[]} values 
    */
	constructor(id, name, createdAt, values) {
		this._id = id;
		this.name = name;
		this.createdAt = createdAt;
		this.values = values;
	}
}

module.exports = {
    /**@type {RequestHandler} */
	getAll: async (req, res) => {
        const result = await MetricCollection.find({});
		res.status(200);
		res.send(result);
    },

	/**@type {RequestHandler} */
	getById: async (req, res) => {
		const id = req.params.id;
		if (id.length !== 24) {
			res.status(400);
			res.json({
				message: "Bad ID",
			});
		} else {
			const resCollection = await MetricCollection.findById(id);
			
			if (resCollection === null) {
				res.status(404);
			} else {
				res.status(200);
			}
			res.send(resCollection);
		}
    },

	/**@type {RequestHandler} */
	add: async (req, res) => {
		const body = req.body;
		if(!body.name ) {
			res.status(400);
			res.json({
				message: "Invalid fields",
			});
		}
		/**@type {MetricCollectionDTO[]} */
		try {
			const result = await MetricCollection.create({
				name: body.name,
				createdAt: Date.now()
			});
			res.status(201);
			res.send(result);
		} catch (error) {
			console.log(error);
			res.status(400);
			res.json({
				message: "Bad request body.",
			});
		}
	},

	/**@type {RequestHandler} */
	delete: async (req, res) => {
		const id = req.params.id;
		if (id.length !== 24) {
			res.status(400);
			res.json({
				message: "Bad ID",
			});
		} else {
			const result = await MetricCollection.findByIdAndDelete(id);
			if (result === null) {
				res.status(404);
			} else {
				res.status(200);
			}
			res.send(result);
		}
	},
};