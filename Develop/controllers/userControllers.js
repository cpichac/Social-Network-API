const User = require('../models/User');

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Get a single user by ID
  getUserById: async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await User.findById(userId).populate('thoughts').populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Create a new user
  createUser: async (req, res) => {
    const { username, email } = req.body;
    try {
      const newUser = await User.create({ username, email });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Update a user by ID
  updateUser: async (req, res) => {
    const userId = req.params.userId;
    const { username, email } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Delete a user by ID
  deleteUser: async (req, res) => {
    const userId = req.params.userId;
    try {
      const deletedUser = await User.findByIdAndRemove(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Optionally, remove user's associated thoughts
      // await Thought.deleteMany({ username: deletedUser.username });
      res.status(204).send();
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
