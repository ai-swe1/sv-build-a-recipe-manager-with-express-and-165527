const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;
const db = new sqlite3.Database('./db/data.db');

app.use(cors());
app.use(bodyParser.json());

// API Routes
app.get('/api/recipes', (req, res) => {
  try {
    db.all('SELECT * FROM recipes', (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows);
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/recipes/:id', (req, res) => {
  try {
    const id = req.params.id;
    db.get('SELECT * FROM recipes WHERE id = ?', id, (err, row) => {
      if (err) {
        throw err;
      }
      if (!row) {
        res.status(404).json({ error: 'Recipe not found' });
      } else {
        res.json(row);
      }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/recipes', (req, res) => {
  try {
    const { name, ingredients, instructions } = req.body;
    db.run('INSERT INTO recipes (name, ingredients, instructions) VALUES (?, ?, ?)', name, JSON.stringify(ingredients), JSON.stringify(instructions), (err) => {
      if (err) {
        throw err;
      }
      res.status(201).json({ message: 'Recipe created successfully' });
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/recipes/:id', (req, res) => {
  try {
    const id = req.params.id;
    db.run('DELETE FROM recipes WHERE id = ?', id, (err) => {
      if (err) {
        throw err;
      }
      res.json({ message: 'Recipe deleted successfully' });
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});