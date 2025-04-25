const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Register Route
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (row) {
      res.json({ success: false, message: 'Email already exists' });
    } else {
      db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password],
        err => {
          if (err) res.json({ success: false, message: 'Error registering user' });
          else res.json({ success: true, message: 'Registration successful' });
        }
      );
    }
  });
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
    if (row) res.json({ success: true, message: 'Login successful' });
    else res.json({ success: false, message: 'Invalid email or password' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
