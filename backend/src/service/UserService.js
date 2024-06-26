const { User, Role } = require("../models");
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../service/MailService');
const tokenService = require('../service/TokenService');
const UserDto = require('../dtos/UserDto');
const ApiError = require('../exceptions/ApiError');

module.exports = {
    async registration (email, password) {
        const candidate = await User.findOne({email});
        if(candidate) {
            throw ApiError.BadRequest(`Email занят`);
        }
        const hashPassword = await bcrypt.hash(password, 7); 
        const activationLink = uuid.v4();
        const newUser = await User.create({email, password: hashPassword, activationLink, createdAt: Date.now() });
        const newUserDto = await new UserDto().init(newUser);

        await mailService.sendActivationMail(email, `${process.env.URL}/api/auth/activate/${activationLink}`);

        const tokens = await tokenService.generateTokens({...newUserDto});
        await tokenService.saveToken(newUser._id, tokens.refreshToken);

        return {
            ...tokens,
            user: {...newUserDto}
        }
    },

    async activate(activationLink) {
        const user = await User.findOne({activationLink});
        if(!user) {
            throw ApiError.BadRequest("Несуществующая ссылка активации");
        }
        user.isActivated = true;
        user.activationLink = '';
        await user.save();
    },

    async login(email, password) {
        const candidate = await User.findOne({email});
        if(!candidate) {
            throw ApiError.BadRequest(`Пользователь не найден`);
        }

        const isPassEquals = await bcrypt.compare(password, candidate.password);
        if(!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = await new UserDto().init(candidate);
        const tokens = await tokenService.generateTokens({...userDto});
        await tokenService.saveToken(candidate._id, tokens.refreshToken);
        return {
            ...tokens,
            user: {...userDto}
        }
    },

    async logout(refreshToken) {
        const res = await tokenService.removeToken(refreshToken);
        return res;
    },

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.Unauthorized();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenInDb = await tokenService.findToken(refreshToken);
        if(!userData || !tokenInDb) {
            throw ApiError.Unauthorized();
        }

        const user = await User.findById(userData.id);
        const userDto = await new UserDto().init(user);
        const tokens = await tokenService.generateTokens({...userDto});
        await tokenService.saveToken(user._id, tokens.refreshToken);
        return {
            ...tokens,
            user: {...userDto}
        }
    }
};