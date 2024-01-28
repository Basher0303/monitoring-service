const { Dashboard, Role } = require("../models");
const { RequestHandler } = require("express");
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/ApiError');

module.exports = {
	getById: async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if(!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка валидации', errors));
			}

			const id = req.params.id;
			const result = await Dashboard.findById(id);
			if (result === null) {
				res.status(404);
			} else {
				res.status(200);
			}
			res.send(result);
		} catch (error) {
			next(error);
		}
    },

	add: async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if(!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка валидации', errors));
			}

			let { options, roles } = req.body;
			roles = roles ?? [];

			for (const role of roles) {
				const roleInBd = await Role.findById(role);
				if(!roleInBd) {
					return next(ApiError.BadRequest(`Role с id ${role} не существует`));
				}
			}
		
			const result = await Dashboard.create({
				options: options,
				roles: roles,
				createdAt: Date.now()
			});
			res.status(201);
			res.send(result);
		} catch (error) {
			next(error);
		}
	
	},

	delete: async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if(!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка валидации', errors));
			}
			
			const id = req.params.id;
			if (id.length !== 24) {
				res.status(400);
				res.json({
					message: "Bad ID",
				});
			} else {
				const result = await Dashboard.findByIdAndDelete(id);
				if (result === null) {
					res.status(404);
				} else {
					res.status(200);
				}
				res.send(result);
			}
		} catch (error) {
			next(error);
		}

	},
};