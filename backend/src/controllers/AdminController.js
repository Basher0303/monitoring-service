const { User, Role } = require("../models");
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/ApiError');
const mongoose = require("mongoose");

module.exports = {
    getAllUsers: async (req, res) => {
        const result = await User.find({});
		res.status(200);
		res.send(result.map(el => ({
            _id: el._id,
            email: el.email,
            roles: el.roles,
            createdAt: el.createdAt
        })));
    },
    editUser: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка валидации', errors));
            }

            const user = req.body.user
            const roles = req.body.roles || []

            const candidateUser = await User.findById(user);
            if(!candidateUser) {
                return next(ApiError.BadRequest(`Пользователь не найден`));
            }

            for (const role of roles) {
                if(!role) continue
                const candidateRole = await Role.findById(role);
                if(!candidateRole) {
                    throw ApiError.BadRequest(`Роль ${role} не найдена`);
                }
            }

            candidateUser.roles = roles;
            await candidateUser.save();
            res.status(200);
            res.send({
                _id: candidateUser._id,
                email: candidateUser.email,
                roles: candidateUser.roles,
                createdAt: candidateUser.createdAt
            });
        } catch (error) {
            next(error);
        }
    },
};