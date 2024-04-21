const express = require("express");
const router = express.Router();
const MetricCollectionRoutes = require("./metricCollection");
const MetricRoutes = require("./metric");
const DocRoutes = require("./doc");
const AuthRoutes = require('./auth')
const DashboardRoutes = require('./dashboard')
const RoleRoutes = require('./role')
const AdminRoutes = require('./admin')

router.use("/collection", MetricCollectionRoutes);
router.use("/metric", MetricRoutes);
router.use("/docs", DocRoutes);
router.use("/auth", AuthRoutes);
router.use("/dashboard", DashboardRoutes);
router.use("/role", RoleRoutes);
router.use("/admin", AdminRoutes);

module.exports = router;