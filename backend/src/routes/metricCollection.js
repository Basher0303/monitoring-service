const express = require("express");
const router = express.Router();
const { MetricCollectionController } = require("../controllers");

router
	.route("/")
	.get(...MetricCollectionController.getAll)
	.put(...MetricCollectionController.add)

router
	.route("/:id")
	.get(...MetricCollectionController.getById)
	.delete(...MetricCollectionController.delete)

	
module.exports = router;