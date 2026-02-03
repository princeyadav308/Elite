/**
 * Authentication Middleware
 */

const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');
const config = require('../../config');

const authenticate = async (req, res, next) => {
    try {
        // Get token from header
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies?.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            return next(new AppError('You are not logged in! Please log in to get access.', 401));
        }

        // Verify token
        const decoded = jwt.verify(token, config.jwt.secret);

        // Attach user info to request
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            gymId: decoded.gymId,
        };

        next();
    } catch (error) {
        return next(new AppError('Invalid token. Please log in again.', 401));
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};

module.exports = { authenticate, authorize };
