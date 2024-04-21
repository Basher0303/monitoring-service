const express = require("express");
const router = express.Router();
const { AdminController } = require("../controllers")
const multer = require('multer');
const upload = multer();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/AuthMiddleware');


router.get('/all-users', authMiddleware, AdminController.getAllUsers);
router.post('/edit-user', 
    authMiddleware, 
    upload.array('user', 'roles'), 
    body('user').isString(),
    body('roles').isArray().optional({ nullable: true }),
    AdminController.editUser
);

module.exports = router;