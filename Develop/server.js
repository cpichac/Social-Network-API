const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const yourMiddleware = require('./middleware/yourMiddleware');

const app = express();
const PORT = process.env.PORT || 3001;

//Custom Middleware
app.use(yourMiddleware.requestLogger);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/socialnetworkdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// API routes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
