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
			const result = await Dashboard.findById(id).populate({
				path: 'roles',
				select: 'name'
			});

			if (result === null) {
				res.status(404);
				res.send(null);
				return
			}

			const rolesIdsFromDashboard = result.roles.map(el => el._id.toString());
			const rolesIdsFromUser = req.user.roles.map(el => el._id.toString());

			if(rolesIdsFromDashboard.length && !rolesIdsFromDashboard.some(r => rolesIdsFromUser.includes(r))) {
				res.status(403);
				res.send(null);
			} else {
				res.status(200);
				res.send(result);
			}
		} catch (error) {
			next(error);
		}
    },

	getList: async (req, res, next) => {
		try {
			const user = req.user;
			const result = await Dashboard.find({
				$or: [
					{ roles: { $size: 0 } }, 
					{
						roles: {
							$elemMatch: { $in: user.roles.map(el => el._id) }
						}
					}
				]
			}).populate({
				path: 'roles',
				select: 'name'
			}).populate({
				path: 'creator',
				select: 'email'
			});;

			if (result === null) {
				res.status(404);
			} else {
				res.status(200);
			}
			res.send(result);
		} catch (error) {
			console.log(error);
			next(error);
		}
    },

	add: async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if(!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка валидации', errors));
			}

			let { name, options, roles } = req.body;
			roles = roles ?? [];

			for (const role of roles) {
				const roleInBd = await Role.findById(role);
				if(!roleInBd) {
					return next(ApiError.BadRequest(`Role с id ${role} не существует`));
				}
			}
		
			const result = await Dashboard.create({
				name: name,
				creator: req.user.id,
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

	update: async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if(!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка валидации', errors));
			}

			let { id, name, roles } = req.body;
			roles = roles ?? []

			for (const role of roles) {
				const roleInBd = await Role.findById(role);
				if(!roleInBd) {
					return next(ApiError.BadRequest(`Role с id ${role} не существует`));
				}
			}
		
			const updated = await Dashboard.findOneAndUpdate({_id: id}, {name, roles }, {
				returnOriginal: false
			}).populate({
				path: 'roles',
				select: 'name'
			});
			res.status(201);
			res.send(updated);
		} catch (error) {
			next(error);
		}
	},

	updateOptions: async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if(!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка валидации', errors));
			}

			let { id, options } = req.body;		
			const updated = await Dashboard.findOneAndUpdate({_id: id}, { options }, {
				returnOriginal: false
			}).populate({
				path: 'roles',
				select: 'name'
			});
			res.status(201);
			res.send(updated);
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