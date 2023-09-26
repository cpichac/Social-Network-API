const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const thoughtController = require('../controllers/thoughtController');
const reactionController = require('../controllers/reactionController');

// User routes
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

// Thought routes
router.get('/thoughts', thoughtController.getAllThoughts);
router.get('/thoughts/:thoughtId', thoughtController.getThoughtById);
router.post('/thoughts', thoughtController.createThought);
router.put('/thoughts/:thoughtId', thoughtController.updateThought);
router.delete('/thoughts/:thoughtId', thoughtController.deleteThought);

// Reaction routes
router.post('/thoughts/:thoughtId/reactions', reactionController.createReaction);
router.delete('/thoughts/:thoughtId/reactions/:reactionId', reactionController.deleteReaction);

module.exports = router;
