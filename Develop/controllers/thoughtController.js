const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
  // Get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Get a single thought by ID
  getThoughtById: async (req, res) => {
    const thoughtId = req.params.thoughtId;
    try {
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Create a new thought
  createThought: async (req, res) => {
    const { thoughtText, username } = req.body;
    try {
      const newThought = await Thought.create({ thoughtText, username });
      // Push the new thought's ID to the user's thoughts array
      await User.findByIdAndUpdate(newThought.username, { $push: { thoughts: newThought._id } });
      res.status(201).json(newThought);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Update a thought by ID
  updateThought: async (req, res) => {
    const thoughtId = req.params.thoughtId;
    const { thoughtText } = req.body;
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { thoughtText },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.status(200).json(updatedThought);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Delete a thought by ID
  deleteThought: async (req, res) => {
    const thoughtId = req.params.thoughtId;
    try {
      const deletedThought = await Thought.findByIdAndRemove(thoughtId);
      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      // Optionally, remove the thought's ID from the user's thoughts array
      // await User.findByIdAndUpdate(deletedThought.username, { $pull: { thoughts: thoughtId } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = thoughtController;
