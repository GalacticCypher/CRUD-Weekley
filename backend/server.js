const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/books', async (req, res) => {
  const result = await pool.query('SELECT * FROM books');
  res.json(result.rows);
});

app.post('/books', async (req, res) => {
  try{
  const { title, author, genre, price } = req.body;
  const result = await pool.query(
    'INSERT INTO books (title, author, genre, price) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, author, genre, price]
  );

  if(result.rows.length === 0){
    return res.status(404).json({ error: 'Book not added'})
  }
  res.json(result.rows[0]);
  }
  catch (error) {
    console.error('Error creating the book')
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/books', async (req, res) => {
  try {
    const { title } = req.body;
    const result = await pool.query(
      'DELETE FROM books WHERE title = $1 RETURNING *',
      [title]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/books', async (req, res) => {
  try{
  const { oldtitle, newtitle, newauthor, newgenre, newprice } = req.body;
  const result = await pool.query(
    'UPDATE books SET title = $2, author = $3, genre = $4, price = $5 WHERE title = $1 RETURNING *;',
    [oldtitle, newtitle, newauthor, newgenre, newprice]
  );

  if(result.rows.length === 0) {
    return res.status(404).json({ error: 'Book not updated'})
  }


  res.json(result.rows[0]);
} catch (error) {
  console.error('Error updating book:', error);
  res.status(500).json({error: 'Internal Server Error'})
}
});


app.post('/users', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = result.rows[0];
    res.json({ role: user.role });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, password]
    );
    res.status(201).json({ message: 'User created', user: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Username already exists' });
    }
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(5000, () => {
  console.log('Server running on port 5000');
});

