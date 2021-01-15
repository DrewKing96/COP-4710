USE register;
DROP TABLE IF EXISTS Event_Association;

CREATE TABLE Event_Association(
	Event_Assocation_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    Event_id INTEGER NOT NULL);