const express = require("express");
const router = express.Router();
const MetricCollectionRoutes = require("./metricCollection");
const MetricRoutes = require("./metric");

router.use("/collection", MetricCollectionRoutes);
router.use("/metric", MetricRoutes);

module.exports = router;