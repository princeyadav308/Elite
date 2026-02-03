/**
 * Gym Controller
 */

const gymService = require('../../services/gym.service');
const { AppError } = require('../middlewares/errorHandler');

exports.getAllGyms = async (req, res, next) => {
    try {
        const gyms = await gymService.getAllGyms();

        res.status(200).json({
            status: 'success',
            results: gyms.length,
            data: { gyms },
        });
    } catch (error) {
        next(error);
    }
};

exports.getGym = async (req, res, next) => {
    try {
        const gym = await gymService.getGymById(req.params.id);

        if (!gym) {
            return next(new AppError('Gym not found', 404));
        }

        res.status(200).json({
            status: 'success',
            data: { gym },
        });
    } catch (error) {
        next(error);
    }
};

exports.createGym = async (req, res, next) => {
    try {
        const gym = await gymService.createGym(req.body);

        res.status(201).json({
            status: 'success',
            data: { gym },
        });
    } catch (error) {
        next(error);
    }
};

exports.updateGym = async (req, res, next) => {
    try {
        const gym = await gymService.updateGym(req.params.id, req.body);

        if (!gym) {
            return next(new AppError('Gym not found', 404));
        }

        res.status(200).json({
            status: 'success',
            data: { gym },
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteGym = async (req, res, next) => {
    try {
        await gymService.deleteGym(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

exports.getGymStats = async (req, res, next) => {
    try {
        const stats = await gymService.getGymStats(req.params.id);

        res.status(200).json({
            status: 'success',
            data: { stats },
        });
    } catch (error) {
        next(error);
    }
};
