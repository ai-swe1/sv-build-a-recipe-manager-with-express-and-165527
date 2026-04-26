CREATE TABLE IF NOT EXISTS Recipe (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS Ingredient (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    quantity TEXT,
    unit TEXT,
    FOREIGN KEY (recipe_id) REFERENCES Recipe(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Instruction (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id INTEGER NOT NULL,
    step_number INTEGER NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES Recipe(id) ON DELETE CASCADE
);
