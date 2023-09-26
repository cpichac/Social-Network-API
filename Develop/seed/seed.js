// seeds.js

const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');

mongoose.connect('mongodb://localhost/socialnetworkdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const seedData = async () => {
  try {
    // Clear existing data (optional)
    await User.deleteMany();
    await Thought.deleteMany();

    // Create users
    const user1 = await User.create({
      username: 'user1',
      email: 'user1@example.com',
    });

    const user2 = await User.create({
      username: 'user2',
      email: 'user2@example.com',
    });

    // Create thoughts
    const thought1 = await Thought.create({
      thoughtText: 'This is the first thought.',
      username: user1.username,
    });

    const thought2 = await Thought.create({
      thoughtText: 'Another thought by user1.',
      username: user1.username,
    });

    const thought3 = await Thought.create({
      thoughtText: 'Thought by user2.',
      username: user2.username,
    });

    // Add thoughts to users
    user1.thoughts.push(thought1, thought2);
    user2.thoughts.push(thought3);

    // Save users
    await user1.save();
    await user2.save();

    console.log('Seed data created successfully.');
  } catch (error) {
    console.error('Error creating seed data:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

seedData();
