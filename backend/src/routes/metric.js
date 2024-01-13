const express = require("express");
const router = express.Router();
const { MetricController } = require("../controllers");
const authMiddleware = require('../middlewares/AuthMiddleware');
const multer = require('multer');
const upload = multer();

router.get("/", authMiddleware, MetricController.getAll)
router.post("/", authMiddleware, upload.array('collectionId', 'value'), MetricController.add)

router.get("/:id", authMiddleware, MetricController.getById)
router.delete("/:id", authMiddleware, MetricController.delete)

router.get("/list/:id", authMiddleware, MetricController.getByCollectionId)

module.exports = router;