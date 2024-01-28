const express = require("express");
const router = express.Router();
const { DashboardController } = require("../controllers")
const authMiddleware = require('../middlewares/AuthMiddleware');
const multer = require('multer');
const upload = multer();
const { body, param } = require('express-validator');


router.get("/:id", authMiddleware,  param('id').isLength({min: 24, max: 24}), DashboardController.getById);
router.delete("/:id", authMiddleware,  param('id').isLength({min: 24, max: 24}), DashboardController.delete);
router.post('/', 
    authMiddleware,
    upload.array('options', 'roles'), 
    DashboardController.add);
router.put('/', 
    authMiddleware,
    upload.array('id', 'options', 'roles'), 
    body('id').isLength({min: 24, max:24}),
    body('options').notEmpty(),
    body('roles').isArray(),
    DashboardController.add);
    

module.exports = router;