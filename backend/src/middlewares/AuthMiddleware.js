const ApiError = require("../exceptions/ApiError");
const tokenService = require("../service/TokenService");
const { User } = require('../models')

module.exports = async function(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        throw ApiError.Unauthorized();
    } 

    const accessToken = authHeader.split(' ')[1];
    if(!accessToken) {
        throw ApiError.Unauthorized();
    }

    const user = tokenService.validateAccessToken(accessToken);
    if(!user) {
        throw ApiError.Unauthorized();
    }
    const userData = await User.findById(user.id).populate({
        path: 'roles',
        select: 'name'
    });
    req.user = userData;
    next();
}