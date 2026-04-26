CREATE TABLE IF NOT EXISTS recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  ingredients TEXT NOT NULL,
  instructions TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);