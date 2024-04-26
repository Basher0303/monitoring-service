const { Role } = require("../models");
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/ApiError');

module.exports = {
    getAll: async (req, res) => {
        const result = await Role.find({});
		res.status(200);
		res.send(result);
    },
    create: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка валидации', errors));
            }
            const { name } = req.body;

            const result = await Role.create({
				name: name,
				createdAt: Date.now()
			});
			res.status(201);
			res.send(result);
            return res.json();
        } catch (error) {
            next(error);
        }
    },
};