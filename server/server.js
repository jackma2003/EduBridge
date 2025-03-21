// server.js - Main entry point for the EduBridge backend

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL || true
    : 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Basic route for testing
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'EduBridge API is running' });
});

// Import routes
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files
  app.use(express.static(path.join(__dirname, '../client/build')));

  // For any request that doesn't match an API route, serve the React app
  app.get('*', (req, res) => {
    // Don't serve React app for API requests
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'API route not found' 
      });
    }
    
    // Serve the React app for all other requests
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});