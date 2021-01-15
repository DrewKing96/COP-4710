USE register;
DROP TABLE IF EXISTS university;

CREATE TABLE university(
	university_id INTEGER(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	institution_name VARCHAR(255) NOT NULL,
	street_address VARCHAR(255) NOT NULL,
	city VARCHAR(255) NOT NULL,
	state VARCHAR(2) NOT NULL,
	zipcode VARCHAR(255) NOT NULL,
	numStudents VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL);