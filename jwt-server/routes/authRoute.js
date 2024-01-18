// authRoute.js
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const secretKey = 'secretKey_Here'; // Replace with a strong secret key

router.post('/login', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required in the request body' });
  }

  // Sign JWT
  const token = jwt.sign({ username, route: 'user' }, secretKey, { expiresIn: '1h' });
  res.json({ token });
});

router.get('/validate', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.redirect('/');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.redirect('/');
    }

    if (decoded.route === 'foo') {
      res.redirect('/foo');
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
