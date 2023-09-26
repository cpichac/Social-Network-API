const Thought = require('../models/Thought');

const reactionController = {
  // Create a reaction for a thought
  createReaction: async (req, res) => {
    const thoughtId = req.params.thoughtId;
    const { reactionBody, username } = req.body;
    
    try {
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      // Create the new reaction
      const newReaction = {
        reactionBody,
        username,
      };

      thought.reactions.push(newReaction);
      await thought.save();

      res.status(201).json(newReaction);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Delete a reaction by its ID
  deleteReaction: async (req, res) => {
    const thoughtId = req.params.thoughtId;
    const reactionId = req.params.reactionId;

    try {
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      // Find and remove the reaction by ID
      const reaction = thought.reactions.find((reaction) => reaction._id == reactionId);
      if (!reaction) {
        return res.status(404).json({ message: 'Reaction not found' });
      }

      thought.reactions.pull({ _id: reactionId });
      await thought.save();

      res.status(204).send();
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = reactionController;
