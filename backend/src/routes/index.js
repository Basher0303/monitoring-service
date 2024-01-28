const express = require("express");
const router = express.Router();
const MetricCollectionRoutes = require("./metricCollection");
const MetricRoutes = require("./metric");
const DocRoutes = require("./doc");
const AuthRoutes = require('./auth')
const DashboardRoutes = require('./dashboard')

router.use("/collection", MetricCollectionRoutes);
router.use("/metric", MetricRoutes);
router.use("/docs", DocRoutes);
router.use("/auth", AuthRoutes);
router.use("/dashboard", DashboardRoutes);

module.exports = router;