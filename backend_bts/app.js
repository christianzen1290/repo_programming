const express = require('express');
const authRoutes = require('./routes/authRoutes');
const checklistRoutes = require('./routes/checklistRoutes');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Use the auth routes
app.use('/auth', authRoutes);

// Use the checklist routes
app.use('/checklist', checklistRoutes);

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});