/**
 * Gym Routes
 */

const express = require('express');
const gymController = require('../controllers/gym.controller');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router
    .route('/')
    .get(gymController.getAllGyms)
    .post(authorize('admin'), gymController.createGym);

router
    .route('/:id')
    .get(gymController.getGym)
    .patch(authorize('admin'), gymController.updateGym)
    .delete(authorize('admin'), gymController.deleteGym);

// Gym statistics
router.get('/:id/stats', gymController.getGymStats);

module.exports = router;
