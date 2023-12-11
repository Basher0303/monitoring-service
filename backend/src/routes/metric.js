const express = require("express");
const router = express.Router();
const { MetricController } = require("../controllers");

router
	.route("/")
	.get(...MetricController.getAll)
	.put(...MetricController.add)

router
	.route("/:id")
	.get(...MetricController.getById)
	.delete(...MetricController.delete)

router
	.route("/list/:id")
	.get(...MetricController.getByCollectionId)

	
module.exports = router;