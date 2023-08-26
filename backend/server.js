
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
const port = 3000;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

app.use(express.json());

// Create tables
db.run('CREATE TABLE products (product_id INT,name TEXT,price INT)');

// Insert values to tables
db.serialize(() => {
  const insert = db.prepare("INSERT INTO products (product_id, name, price) VALUES (?, ?, ?)");
  insert.run(1, 'Laptop', 85000);
  insert.run(2, 'Smart Phone', 16999);
  insert.run(3, 'Head Phone', 1600);
  insert.run(4, 'Tablet', 28000);
  insert.run(5, 'Camera', 156500);
  insert.finalize();
});

db.run('CREATE TABLE customer_preference (preference_id TEXT,product_id INT)');

db.serialize(() => {
  const insert = db.prepare("INSERT INTO customer_preference (preference_id,product_id) VALUES(?, ?)");
  insert.run('p1', 1);
  insert.run('p1', 2);
  insert.run('p1', 4);
  insert.run('p2', 2);
  insert.run('p2', 3);
  insert.run('p3', 1);
  insert.run('p3', 3);
  insert.run('p3', 5);
  insert.run('p4', 4);
  insert.run('p4', 2);
  insert.run('p5', 1);
  insert.run('p5', 3);
  insert.run('p5', 4);
  insert.run('p5', 5);
  insert.finalize();
});

db.run('CREATE TABLE orders (customer_id TEXT,preference_id TEXT,date TEXT)');

db.serialize(() => {
  const insert = db.prepare("INSERT INTO orders (customer_id,preference_id,date) VALUES(?, ?, ?)");
  insert.run('User1', 'p1', '15/04/2023');
  insert.run('User2', 'p3', '16/04/2023');
  insert.run('User2', 'p4', '17/05/2023');
  insert.run('User4', 'p2', '17/05/2023');
  insert.run('User1', 'p2', '01/06/2023');
  insert.run('User5', 'p2', '04/06/2023');
  insert.run('User4', 'p4', '06/06/2023');
  insert.run('User3', 'p3', '06/06/2023');
  insert.run('User2', 'p5', '08/06/2023');
  insert.run('User5', 'p5', '11/06/2023');
  insert.run('User5', 'p3', '11/06/2023');
  insert.run('User3', 'p1', '15/06/2023');
  insert.finalize();
});


// API route to fetch table data
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(rows);
  });
});

app.get('/api/customer_preference', (req, res) => {
  db.all('SELECT * FROM customer_preference', [], (err, rows) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(rows);
  });
});

app.get('/api/orders', (req, res) => {
  db.all('SELECT * FROM orders', [], (err, rows) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(rows);
  });
});


//Queries
app.get('/api/most-popular-product', (req, res) => {
  db.get('SELECT p.name AS most_popular_product,COUNT(*) AS popularity_count FROM products p JOIN customer_preference cp ON p.product_id = cp.product_id JOIN orders o ON cp.preference_id = o.preference_id GROUP BY p.product_id ORDER BY popularity_count DESC LIMIT 1;', [], (err, rows) => {
    if(err) {
      res.status(500).send(err);
    }
    res.json(rows);
  });
});

app.get('/api/most-order-customer', (req, res) => {
  db.get('SELECT o.customer_id FROM orders o JOIN customer_preference cp ON o.preference_id = cp.preference_id LEFT JOIN products p ON cp.product_id = p.product_id GROUP BY o.customer_id HAVING COUNT(DISTINCT p.product_id) = (SELECT COUNT(*) FROM products);', [], (err, rows) => {
    if(err) {
      res.status(500).send(err);
    }
    res.json(rows);
  });
});

app.get('/api/inexpensive-customer', (req, res) => {
  db.get('SELECT DISTINCT o.customer_id FROM orders o JOIN customer_preference cp ON o.preference_id = cp.preference_id JOIN products p ON cp.product_id = p.product_id WHERE p.price <=(select min(price) from products);', [], (err, rows) => {
    if(err) {
      res.status(500).send(err);
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
