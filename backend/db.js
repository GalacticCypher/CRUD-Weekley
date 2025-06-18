const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://user:password@db:5432/booksdb"
});

module.exports = pool;
