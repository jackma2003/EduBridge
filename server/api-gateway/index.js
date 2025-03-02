const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Proxy routes to respective services
app.use('/api/users', createProxyMiddleware({ 
  target: 'http://user-service:4001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': '/'
  }
}));

app.use('/api/courses', createProxyMiddleware({ 
  target: 'http://course-service:4002',
  changeOrigin: true,
  pathRewrite: {
    '^/api/courses': '/'
  }
}));

app.use('/api/content', createProxyMiddleware({ 
  target: 'http://content-service:4003',
  changeOrigin: true,
  pathRewrite: {
    '^/api/content': '/'
  }
}));

// Fallback route
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server'
  });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});