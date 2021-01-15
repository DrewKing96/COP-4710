USE register;
CREATE TABLE events(
	event_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_category VARCHAR(255) NOT NULL,
    day VARCHAR(255) NOT NULL,
    month VARCHAR(2) NOT NULL,
    year VARCHAR(255) NOT NULL,
    startTime VARCHAR(255) NOT NULL,
    endTime VARCHAR(255) NOT NULL,
	contact_phone VARCHAR(255) NOT NULL,
	contact_email VARCHAR(255) NOT NULL);