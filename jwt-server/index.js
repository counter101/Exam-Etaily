// index.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/auth', authRoute);

app.listen(PORT, () => {
  console.log(`JWT Server is running on port ${PORT}`);
});
