// index.js
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

// Routes
app.get('/foo', userController.getAllUsers);
app.post('/foo', userController.createUser);
app.put('/foo/:id', userController.updateUser);
app.delete('/foo/:id', userController.deleteUser);

app.listen(PORT, () => {
  console.log(`User Management Server is running on port ${PORT}`);
});
