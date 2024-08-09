const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // You can change this to any port you prefer

// Middleware
app.use(bodyParser.json());

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server berjalan di port : ${port}`);
});
