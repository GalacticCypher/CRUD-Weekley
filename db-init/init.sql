CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT,
  price NUMERIC(10, 2),
  quantity NUMERIC
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user'
);

INSERT INTO books (title, author, genre, price, quantity) VALUES
('Dune', 'Frank Herbert', 'Sci-Fi', 9.99, 5),
('1984', 'George Orwell', 'Dystopian', 8.49, 4),
('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 10.99, 6),
('The Hunger Games', 'Suzanne Collins', 'Dystopian', 13.99, 3),
('The Raven', 'Edgar Alla Poe', 'Poem', 6.99, 10),
('Lord of Flies', 'William Golding', 'Psychological Fiction', 10.99, 10)
ON CONFLICT DO NOTHING;

INSERT INTO users (username, password, role) VALUES
('admin', 'admin123', 'admin')
ON CONFLICT DO NOTHING;