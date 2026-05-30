CREATE TABLE "User" (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE "Routine" (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  mood TEXT NOT NULL UNIQUE,
  inhale_seconds INTEGER NOT NULL,
  hold_seconds INTEGER NOT NULL,
  exhale_seconds INTEGER NOT NULL,
  second_hold_seconds INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  description TEXT NOT NULL,
  objective TEXT NOT NULL
);

CREATE TABLE "Session" (
  id INTEGER PRIMARY KEY,
  "user" INTEGER NOT NULL,
  routine INTEGER NOT NULL,
  mood_before TEXT NOT NULL,
  mood_after TEXT,
  date TEXT NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY ("user") REFERENCES "User" (id),
  FOREIGN KEY (routine) REFERENCES "Routine" (id)
);
