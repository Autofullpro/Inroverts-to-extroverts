require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const chatRouter = require('./routes/chat');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/chat', chatRouter);
app.use('/api/users', usersRouter);

// Static (optional) serve frontend build if you decide monorepo build
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// Fallback to index.html for SPA (if you build frontend into dist)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'), err => {
    if (err) res.status(404).send('Not found');
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Websus backend running on http://localhost:${PORT}`);
});
