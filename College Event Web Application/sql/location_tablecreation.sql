USE register;
CREATE TABLE location(
	locationName VARCHAR(255) NOT NULL PRIMARY KEY,
    locationAddress VARCHAR(255) NOT NULL,
    longitude INTEGER NOT NULL,
    latitude INTEGER NOT NULL);