const multer = require('multer');
const { Metric, MetricCollection } = require("../models");
const { RequestHandler } = require("express");

const upload = multer();

module.exports = {
    /**@type {RequestHandler} */
	getAll: async (req, res) => {
        const result = await Metric.find({});
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
			const result = await Metric.findById(id);
			if (result === null) {
				res.status(404);
			} else {
				res.status(200);
			}
			res.send(result);
		}
    },

	/**@type {RequestHandler} */
	getByCollectionId: async (req, res) => {
		const id = req.params.id;
		if (id.length !== 24) {
			res.status(400);
			res.json({
				message: "Bad ID",
			});
		} else {
			const resCollection = await MetricCollection.findById(id);
			const resMetrics = await Metric.find({collectionId: id}).exec();
			
			if (resCollection === null) {
				res.status(404);
			} else {
				res.status(200);
			}
			res.send(resMetrics);
		}
    },
	
	/**@type {RequestHandler} */
	add: async (req, res) => {
		const body = req.body;
		if(!body.collectionId || !body.value) {
			res.status(400);
			res.json({
				message: "Invalid fields",
			});
		}
		else {
			try {
				const result = await Metric.create({
					collectionId: body.collectionId,
					value: body.value,
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
			const result = await Metric.findByIdAndDelete(id);
			if (result === null) {
				res.status(404);
			} else {
				res.status(200);
			}
			res.send(result);
		}
	},
};