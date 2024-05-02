const express = require("express");
const router = express.Router();
const { MetricController } = require("../controllers");
const authMiddleware = require('../middlewares/AuthMiddleware');
const multer = require('multer');
const upload = multer();

router.get("/", MetricController.getAll)
router.post("/", upload.array('collectionId', 'value'), MetricController.add)

router.get("/:id", MetricController.getById)
router.delete("/:id", MetricController.delete)

router.get("/list/:id", MetricController.getByCollectionId)

module.exports = router;