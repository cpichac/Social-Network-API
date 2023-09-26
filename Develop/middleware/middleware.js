// yourMiddleware.js

// Custom middleware function to log incoming requests
function requestLogger(req, res, next) {
    console.log(`Received ${req.method} request for ${req.url} at ${new Date()}`);
    next(); // Call next to pass control to the next middleware or route handler
  }
  
  // Export the middleware function
  module.exports = {
    requestLogger,
  };
  