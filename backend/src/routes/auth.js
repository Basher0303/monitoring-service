const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers")
const multer = require('multer');
const upload = multer();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/AuthMiddleware');

router.post('/registration', 
    upload.array('email', 'password'), 
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 64}),
    UserController.registration);
router.post('/login', 
    upload.array('email', 'password'), 
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 64}),
    UserController.login);
router.post('/logout', UserController.logout);

router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);

module.exports = router;