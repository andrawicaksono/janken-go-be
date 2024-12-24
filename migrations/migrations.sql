DROP TABLE IF EXISTS rounds;
DROP TABLE IF EXISTS games;

CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  email varchar(255) UNIQUE NOT NULL,
  password varchar(255),
  google_id varchar(255),
  nickname varchar(255) NOT NULL,
  avatar_url varchar(255) NOT NULL,
  score integer DEFAULT 0 NOT NULL,
  xp integer DEFAULT 0 NOT NULL,
  games_played integer DEFAULT 0 NOT NULL,
  games_won integer DEFAULT 0 NOT NULL,
  games_lost integer DEFAULT 0 NOT NULL,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL,
  deleted_at timestamp DEFAULT null
);

CREATE TABLE IF NOT EXISTS games (
  id serial PRIMARY KEY,
  room_code varchar(255),
  player1_id integer NOT NULL,
  player2_id integer NOT NULL,
  rounds_played int DEFAULT 0 NOT NULL,
  player1_wins integer DEFAULT 0 NOT NULL,
  player2_wins integer DEFAULT 0 NOT NULL,
  winner_id integer,
  player1_score integer DEFAULT 0 NOT NULL,
  player2_score integer DEFAULT 0 NOT NULL,
  player1_xp integer DEFAULT 0 NOT NULL,
  player2_xp integer DEFAULT 0 NOT NULL,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL,
  deleted_at timestamp DEFAULT null
);

CREATE TABLE IF NOT EXISTS rounds (
  id serial PRIMARY KEY,
  game_id integer NOT NULL,
  round_number integer NOT NULL,
  player1_choice char(1),
  player2_choice char(1),
  winner_id integer,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL,
  deleted_at timestamp DEFAULT null
);

ALTER TABLE games ADD FOREIGN KEY (player1_id) REFERENCES users (id);

ALTER TABLE games ADD FOREIGN KEY (player2_id) REFERENCES users (id);

ALTER TABLE games ADD FOREIGN KEY (winner_id) REFERENCES users (id);

ALTER TABLE rounds ADD FOREIGN KEY (game_id) REFERENCES games (id);

ALTER TABLE rounds ADD FOREIGN KEY (winner_id) REFERENCES users (id);
