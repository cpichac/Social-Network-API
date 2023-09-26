const mongoose = require('mongoose');

// Define the MongoDB connection URL
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/socialnetworkdb';

// Connect to the MongoDB database
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false, // To avoid deprecation warnings
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Export the Mongoose connection
module.exports = mongoose.connection;
