// Express Server 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const contentRoutes = require('./routes/contentRoutes');
const progressRoutes = require('./routes/progressRoutes');

// Create Express app
const app = express();

// Set up rate limiter: maximum of 100 requests per minute
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Security middleware
app.use(helmet());
app.use(cors());

// Request logging
app.use(morgan('dev'));

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/progress', progressRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('EduBridge API is running');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/edubridge', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
}

// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

// Set port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;