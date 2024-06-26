const jwt = require('jsonwebtoken');
const { Token } = require('../models')

module.exports = {
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1d'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {accessToken, refreshToken}
    },

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId});

        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const newToken = await Token.create({user: userId, refreshToken});
        return newToken;
    },

    async removeToken(refreshToken) {
        const res = await Token.deleteOne({refreshToken});
        return res;
    },

    async findToken(refreshToken) {
        const token = await Token.findOne({refreshToken});
        return token;
    },

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    },

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }
}