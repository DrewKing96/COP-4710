USE register;
DROP TABLE IF EXISTS comments;
CREATE TABLE comments(
	comment_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    event_id INTEGER,
    comment VARCHAR(255),
    user_id INTEGER);