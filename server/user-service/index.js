const express = require('express');
const mongoose = require('mongoose');
const { Kafka } = require('kafkajs');

const app = express();
const PORT = process.env.PORT || 4001;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/edubridge_users')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Kafka setup
const kafka = new Kafka({
  clientId: 'user-service',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',')
});

const producer = kafka.producer();
producer.connect()
  .then(() => console.log('Connected to Kafka'))
  .catch(err => console.error('Kafka connection error:', err));

// Middleware
app.use(express.json());

// Define schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
  preferences: {
    language: { type: String, default: 'en' },
    theme: { type: String, default: 'light' },
    notifications: { type: Boolean, default: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Create a new user
app.post('/register', async (req, res) => {
  try {
    const { username, email, password, fullName, role } = req.body;
    
    // Create new user (in a real app, you would hash the password)
    const user = new User({
      username,
      email,
      password,  // Should be hashed in production
      fullName,
      role
    });
    
    await user.save();
    
    // Publish user created event
    await producer.send({
      topic: 'user-events',
      messages: [
        { 
          key: user._id.toString(), 
          value: JSON.stringify({
            event: 'USER_CREATED',
            data: {
              userId: user._id,
              username: user.username,
              email: user.email,
              role: user.role
            }
          })
        }
      ]
    });
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        userId: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});