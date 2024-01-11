const ApiError = require("../exceptions/ApiError");
const tokenService = require("../service/TokenService");

module.exports = function(err, req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            throw ApiError.Unauthorized();
        } 

        const accessToken = authHeader.split(' ')[1];
        if(!accessToken) {
            throw ApiError.Unauthorized();
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData) {
            throw ApiError.Unauthorized();
        }
        req.user = userData;
        next();
    } catch (error) {
        
    }
}