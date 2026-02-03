/**
 * Member Controller
 */

const memberService = require('../../services/member.service');
const { AppError } = require('../middlewares/errorHandler');

exports.getAllMembers = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, tier, status } = req.query;
        const members = await memberService.getAllMembers({ page, limit, tier, status, gymId: req.user.gymId });

        res.status(200).json({
            status: 'success',
            results: members.length,
            data: { members },
        });
    } catch (error) {
        next(error);
    }
};

exports.getMember = async (req, res, next) => {
    try {
        const member = await memberService.getMemberById(req.params.id);

        if (!member) {
            return next(new AppError('Member not found', 404));
        }

        res.status(200).json({
            status: 'success',
            data: { member },
        });
    } catch (error) {
        next(error);
    }
};

exports.createMember = async (req, res, next) => {
    try {
        const member = await memberService.createMember(req.body);

        res.status(201).json({
            status: 'success',
            data: { member },
        });
    } catch (error) {
        next(error);
    }
};

exports.updateMember = async (req, res, next) => {
    try {
        const member = await memberService.updateMember(req.params.id, req.body);

        if (!member) {
            return next(new AppError('Member not found', 404));
        }

        res.status(200).json({
            status: 'success',
            data: { member },
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteMember = async (req, res, next) => {
    try {
        await memberService.deleteMember(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

exports.checkIn = async (req, res, next) => {
    try {
        const checkIn = await memberService.checkInMember(req.params.id, req.user.gymId);

        res.status(200).json({
            status: 'success',
            data: { checkIn },
        });
    } catch (error) {
        next(error);
    }
};

exports.checkOut = async (req, res, next) => {
    try {
        const checkIn = await memberService.checkOutMember(req.params.id);

        res.status(200).json({
            status: 'success',
            data: { checkIn },
        });
    } catch (error) {
        next(error);
    }
};

exports.getMemberHistory = async (req, res, next) => {
    try {
        const history = await memberService.getMemberHistory(req.params.id);

        res.status(200).json({
            status: 'success',
            data: { history },
        });
    } catch (error) {
        next(error);
    }
};

exports.getMemberBadges = async (req, res, next) => {
    try {
        const badges = await memberService.getMemberBadges(req.params.id);

        res.status(200).json({
            status: 'success',
            data: { badges },
        });
    } catch (error) {
        next(error);
    }
};
