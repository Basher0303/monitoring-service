const express = require("express");
const router = express.Router();
const { MetricCollectionController } = require("../controllers");
const authMiddleware = require('../middlewares/AuthMiddleware');
const multer = require('multer');
const upload = multer();

router.get('/', authMiddleware, MetricCollectionController.getAll);
router.post('/', authMiddleware, upload.array('name'), MetricCollectionController.add);

router.get("/:id", authMiddleware, MetricCollectionController.getById);
router.delete("/:id", authMiddleware, MetricCollectionController.delete);
	
module.exports = router;