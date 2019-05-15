CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(32) UNIQUE NOT NULL,
  email VARCHAR(320) UNIQUE NOT NULL,
  role VARCHAIR(10) DEFAULT "user",
  password TINYTEXT NOT NULL
);

CREATE TABLE country (
  id INT PRIMARY KEY AUTO_INCREMENT,
  coord POINT NOT NULL SRID 4326,
  zoom_level FLOAT(4) DEFAULT 5,
  name varchar(60)
);

CREATE TABLE destination (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  country_id INT,
  coord POINT NOT NULL SRID 4326,
  zoom_level FLOAT(4) DEFAULT 11,
  FOREIGN KEY (country_id) REFERENCES country (id)
);

CREATE TABLE divesite (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name TINYTEXT NOT NULL,
  destination_id INT,
  coord POINT NOT NULL SRID 4326,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (destination_id) REFERENCES destination (id)
);

CREATE TABLE note (
  id INT PRIMARY KEY AUTO_INCREMENT,
  content TEXT NOT NULL,
  divesite_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (divesite_id) REFERENCES divesite (id),
  FOREIGN KEY (user_id) REFERENCES user (id),
  UNIQUE(divesite_id, user_id)
);
