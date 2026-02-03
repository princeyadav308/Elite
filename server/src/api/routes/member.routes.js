/**
 * Member Routes
 */

const express = require('express');
const memberController = require('../controllers/member.controller');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router
    .route('/')
    .get(memberController.getAllMembers)
    .post(authorize('admin', 'trainer'), memberController.createMember);

router
    .route('/:id')
    .get(memberController.getMember)
    .patch(authorize('admin', 'trainer'), memberController.updateMember)
    .delete(authorize('admin'), memberController.deleteMember);

// Member-specific endpoints
router.post('/:id/check-in', memberController.checkIn);
router.post('/:id/check-out', memberController.checkOut);
router.get('/:id/history', memberController.getMemberHistory);
router.get('/:id/badges', memberController.getMemberBadges);

module.exports = router;
