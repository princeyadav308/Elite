/**
 * Authentication Controller
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AppError } = require('../middlewares/errorHandler');
const userService = require('../../services/user.service');
const config = require('../../config');

// Generate JWT token
const signToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
            gymId: user.gym_id
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
    );
};

// Send token response
const sendTokenResponse = (user, statusCode, res) => {
    const token = signToken(user);

    // Remove password from output
    delete user.password_hash;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: { user },
    });
};

exports.register = async (req, res, next) => {
    try {
        const { email, password, fullName, gymId, role } = req.body;

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Create user
        const user = await userService.createUser({
            email,
            password_hash: passwordHash,
            full_name: fullName,
            gym_id: gymId,
            role: role || 'member',
            status: 'active',
        });

        sendTokenResponse(user, 201, res);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if email and password exist
        if (!email || !password) {
            return next(new AppError('Please provide email and password!', 400));
        }

        // Get user by email
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return next(new AppError('Incorrect email or password', 401));
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordCorrect) {
            return next(new AppError('Incorrect email or password', 401));
        }

        // Check if user is active
        if (user.status !== 'active') {
            return next(new AppError('Your account has been deactivated. Please contact support.', 403));
        }

        // Update last login
        await userService.updateLastLogin(user.id);

        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
};

exports.logout = async (req, res, next) => {
    try {
        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully',
        });
    } catch (error) {
        next(error);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.user.id);

        res.status(200).json({
            status: 'success',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};

exports.updatePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await userService.getUserById(req.user.id);

        // Check current password
        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isPasswordCorrect) {
            return next(new AppError('Current password is incorrect', 401));
        }

        // Hash new password
        const newPasswordHash = await bcrypt.hash(newPassword, 12);

        // Update password
        await userService.updateUser(user.id, { password_hash: newPasswordHash });

        res.status(200).json({
            status: 'success',
            message: 'Password updated successfully',
        });
    } catch (error) {
        next(error);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        // TODO: Implement password reset logic with email
        res.status(200).json({
            status: 'success',
            message: 'Password reset link sent to email',
        });
    } catch (error) {
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        // TODO: Implement password reset logic
        res.status(200).json({
            status: 'success',
            message: 'Password reset successful',
        });
    } catch (error) {
        next(error);
    }
};
