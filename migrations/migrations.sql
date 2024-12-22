DROP TABLE IF EXISTS rounds;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  email varchar(255) UNIQUE,
  password varchar(255),
  nickname varchar(255),
  photo_url varchar(255),
  score integer DEFAULT 0,
  xp integer DEFAULT 0,
  games_played integer DEFAULT 0,
  games_won integer DEFAULT 0,
  games_lost integer DEFAULT 0,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  deleted_at timestamp DEFAULT null
);

CREATE TABLE games (
  id serial PRIMARY KEY,
  player1_id integer,
  player2_id integer,
  round int DEFAULT 0,
  player1_wins integer DEFAULT 0,
  player2_wins integer DEFAULT 0,
  winner_id integer,
  player1_score integer DEFAULT 0,
  player2_score integer DEFAULT 0,
  player1_xp integer DEFAULT 0,
  player2_xp integer DEFAULT 0,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  deleted_at timestamp DEFAULT null
);

CREATE TABLE rounds (
  id serial PRIMARY KEY,
  game_id integer,
  round_number integer,
  player1_choice char(1),
  player2_choice char(1),
  winner_id integer
);

ALTER TABLE games ADD FOREIGN KEY (player1_id) REFERENCES users (id);

ALTER TABLE games ADD FOREIGN KEY (player2_id) REFERENCES users (id);

ALTER TABLE games ADD FOREIGN KEY (winner_id) REFERENCES users (id);

ALTER TABLE rounds ADD FOREIGN KEY (game_id) REFERENCES games (id);

ALTER TABLE rounds ADD FOREIGN KEY (winner_id) REFERENCES users (id);
