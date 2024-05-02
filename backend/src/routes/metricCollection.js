const express = require("express");
const router = express.Router();
const { MetricCollectionController } = require("../controllers");
const authMiddleware = require('../middlewares/AuthMiddleware');
const multer = require('multer');
const upload = multer();

router.get('/',  MetricCollectionController.getAll);
router.post('/',  upload.array('name'), MetricCollectionController.add);

router.get("/:id",  MetricCollectionController.getById);
router.delete("/:id",  MetricCollectionController.delete);
	
module.exports = router;