require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'client_manage'
});

db.connect(err => {
    if (err) console.error('MySQL Error:', err.message);
    else console.log('MySQL Connected');
});

app.get('/api/clients', (req, res) => {
    db.query("SELECT * FROM clients", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/clients', (req, res) => {
    const { name, email, company } = req.body;
    db.query("INSERT INTO clients (name, email, company) VALUES (?, ?, ?)",
      [name, email, company],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, name, email, company });
      });
});

app.listen(3000, () => console.log('Backend running on port 3000'));
