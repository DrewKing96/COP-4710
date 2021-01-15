USE register;
DROP TABLE IF EXISTS events;
CREATE TABLE events(
	event_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_category VARCHAR(255) NOT NULL,
    day VARCHAR(2) NOT NULL,
    month VARCHAR(255) NOT NULL,
    year VARCHAR(4) NOT NULL,
    startTime VARCHAR(255) NOT NULL,
    endTime VARCHAR(255) NOT NULL,
	contact_phone VARCHAR(255) NOT NULL,
	contact_email VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    longitude INTEGER NOT NULL,
    latitude INTEGER NOT NULL,
    creator_id INTEGER,
    approvalcode INTEGER,
    school VARCHAR(255));