/**
 * User Routes
 */

const express = require('express');
const userController = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router
    .route('/')
    .get(authorize('admin'), userController.getAllUsers)
    .post(authorize('admin'), userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(authorize('admin'), userController.deleteUser);

module.exports = router;
