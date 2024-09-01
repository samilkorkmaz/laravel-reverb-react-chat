-- Insert data into sqlite database tables
-- Create tables with php artisan migrate
/*CREATE TABLE cache (
  key TEXT NOT NULL PRIMARY KEY,
  value TEXT NOT NULL,
  expiration INTEGER
);

-- Table: cache_locks
CREATE TABLE cache_locks (
  key TEXT NOT NULL PRIMARY KEY,
  owner TEXT NOT NULL,
  expiration INTEGER NOT NULL
);

-- Table: failed_jobs
CREATE TABLE failed_jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uuid TEXT NOT NULL UNIQUE,
  connection TEXT NOT NULL,
  queue TEXT NOT NULL,
  payload TEXT NOT NULL,
  exception TEXT NOT NULL,
  failed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: jobs
CREATE TABLE jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  queue TEXT NOT NULL,
  payload TEXT NOT NULL,
  attempts INTEGER NOT NULL,
  reserved_at INTEGER DEFAULT NULL,
  available_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);

-- Table: job_batches
CREATE TABLE job_batches (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  total_jobs INTEGER NOT NULL,
  pending_jobs INTEGER NOT NULL,
  failed_jobs INTEGER NOT NULL,
  failed_job_ids TEXT NOT NULL,
  options TEXT DEFAULT NULL,
  cancelled_at INTEGER DEFAULT NULL,
  created_at INTEGER NOT NULL,
  finished_at INTEGER DEFAULT NULL
);

-- Table: messages
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  to_id INTEGER NOT NULL,
  text TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table: migrations
CREATE TABLE migrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  migration TEXT NOT NULL,
  batch INTEGER NOT NULL
);

-- Table: password_reset_tokens
CREATE TABLE password_reset_tokens (
  email TEXT NOT NULL PRIMARY KEY,
  token TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NULL
);

-- Table: sessions
CREATE TABLE sessions (
  id TEXT NOT NULL PRIMARY KEY,
  user_id INTEGER DEFAULT NULL,
  ip_address TEXT DEFAULT NULL,
  user_agent TEXT DEFAULT NULL,
  payload TEXT NOT NULL,
  last_activity INTEGER NOT NULL
);

-- Table: users
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  email_verified_at TIMESTAMP DEFAULT NULL,
  password TEXT NOT NULL,
  remember_token TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);*/

INSERT INTO messages (id, user_id, to_id, text, created_at, updated_at) VALUES
(1, 1, 2, '1111', '2024-07-27 04:03:35', '2024-07-27 04:03:35'),
(2, 2, 1, '2222', '2024-07-27 04:04:32', '2024-07-27 04:04:32'),
(3, 1, 3, '1', '2024-07-27 04:06:42', '2024-07-27 04:06:42'),
(4, 2, 1, '2', '2024-07-27 04:11:02', '2024-07-27 04:11:02'),
(5, 1, 3, '111', '2024-07-27 04:17:38', '2024-07-27 04:17:38'),
(6, 1, 3, '11', '2024-07-27 04:19:26', '2024-07-27 04:19:26'),
(7, 2, 3, '22', '2024-07-27 04:19:34', '2024-07-27 04:19:34'),
(8, 1, 2, 'fsfsdf', '2024-07-27 05:58:40', '2024-07-27 05:58:40'),
(9, 3, 1, 'own 3', '2024-07-27 10:36:30', '2024-07-27 10:36:30'),
(10, 1, 2, 'ssss', '2024-07-27 10:54:41', '2024-07-27 10:54:41'),
(11, 2, 1, 'aaaa', '2024-07-27 10:55:13', '2024-07-27 10:55:13'),
(12, 1, 2, '234', '2024-07-27 11:05:42', '2024-07-27 11:05:42'),
(13, 1, 2, '555', '2024-07-27 11:05:46', '2024-07-27 11:05:46'),
(14, 1, 3, 'ddd', '2024-07-28 02:41:05', '2024-07-28 02:41:05'),
(15, 1, 2, 'from 1 to 2', '2024-07-28 03:22:53', '2024-07-28 03:22:53'),
(16, 1, 3, 'from 1 to 3', '2024-07-28 03:23:09', '2024-07-28 03:23:09'),
(17, 1, 0, 'from 1 to everybody', '2024-08-28 17:00:05', '2024-08-28 17:00:08');

INSERT INTO migrations (id, migration, batch) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_03_25_000831_create_messages_table', 1),
(5, '2024_07_27_091541_add_to_id_to_messages_table', 2);

INSERT INTO users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at) VALUES
(0, 'Everybody', 'null', NULL, '1', NULL, NULL, NULL),
(1, 's1', 's1@g.com', NULL, '$2y$12$J01xqqniewNHouHWIEI.3OIYAm8MeBnSzaMwEYt1yeQnWMLBfq5ya', NULL, '2024-07-27 03:59:58', '2024-07-27 03:59:58'),
(2, 's2', 's2@g.com', NULL, '$2y$12$Ut0i2y39OfKnC2gLLPGXAOsuRN0Se916o7E7Iol2jF5oN3W6yEBSm', NULL, '2024-07-27 04:03:14', '2024-07-27 04:03:14'),
(3, 's3', 's3@g.com', NULL, '$2y$12$fz9HcPzWcKDmIzhnNcvyF.LrKc4jeECl9LQGjcPCpIcNnUY6WVhFS', NULL, '2024-07-28 03:18:46', '2024-07-28 03:18:46');

