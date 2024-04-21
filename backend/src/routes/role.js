const express = require("express");
const router = express.Router();
const { RoleController } = require("../controllers")
const multer = require('multer');
const upload = multer();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/AuthMiddleware');


router.get('/', authMiddleware, RoleController.getAll);
router.post('/', authMiddleware,upload.array('name'), body('name').isLength({min: 3, max: 32}), RoleController.create);

module.exports = router;