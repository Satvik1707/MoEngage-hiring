const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const { dbURI } = require('./config/config');
const userRoutes = require('./routes/userRoutes');

// Connect to MongoDB
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3001, () => {
      console.log('Server connected to port 3001 and MongoDB');
    });
  })
  .catch((error) => {
    console.log('Unable to connect to Server and/or MongoDB', error);
  });

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to your API!');
});

// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
