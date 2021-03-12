const express = require('express');

// If deploying this in production, we do not want to utilize dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Define application and port
const app = express();
const PORT = process.env.PORT || 5500;

console.log(process.env.GCLOUD_CLIENT_EMAIL);

// Initialize middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/chat', require('./routes/chat/chat'));
app.use('/desk', require('./routes/desk/desk'));
app.use('/dialogflow', require('./routes/dialogflow/dialogflow'));

// Default route to test if webserver is accessible
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World',
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
