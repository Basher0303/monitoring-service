const express = require("express");
const router = express.Router();
const { DashboardController } = require("../controllers")
const authMiddleware = require('../middlewares/AuthMiddleware');
const multer = require('multer');
const upload = multer();
const { body, param } = require('express-validator');


router.get("/single/:id", authMiddleware,  param('id').isLength({min: 24, max: 24}), DashboardController.getById);
router.get("/list", authMiddleware, DashboardController.getList);
router.delete("/:id", authMiddleware,  param('id').isLength({min: 24, max: 24}), DashboardController.delete);
router.post('/', 
    authMiddleware,
    upload.array('options', 'roles'), 
    DashboardController.add);
router.put('/update', 
    authMiddleware,
    upload.array('id', 'name', 'roles'), 
    body('id').isLength({min: 24, max:24}),
    DashboardController.update);
router.put('/update-options', 
    authMiddleware,
    upload.array('id', 'options'), 
    body('id').isLength({min: 24, max:24}),
    DashboardController.updateOptions);
    

module.exports = router;