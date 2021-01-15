DROP DATABASE IF EXISTS register;
CREATE DATABASE register;
USE register;

CREATE TABLE users(
	user_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fName VARCHAR(255) NOT NULL,
    lName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    userSchool VARCHAR(255) NOT NULL,
    userName VARCHAR(255) NOT NULL,
    userPWD VARCHAR(255) NOT NULL);

CREATE TABLE location(
	locationName VARCHAR(255) NOT NULL PRIMARY KEY,
    locationAddress VARCHAR(255) NOT NULL,
    longitude INTEGER NOT NULL,
    latitude INTEGER NOT NULL);

CREATE TABLE comments(
	comment_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    event_id INTEGER,
    comment VARCHAR(255),
    user_id INTEGER);

CREATE TABLE Event_Association(
	Event_Assocation_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    Event_id INTEGER NOT NULL);

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

CREATE TABLE rso(
RSO_id INTEGER NOT NULL auto_increment primary KEY,
RSO_name VARCHAR(255) ,
RSO_uniassociation VARCHAR(255),
numMembers INTEGER,
admin_id INTEGER,
activation INTEGER
);

CREATE TABLE rso_Association(
	RSO_Assocation_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    RSO_id INTEGER NOT NULL);

CREATE TABLE university(
	university_id INTEGER(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	institution_name VARCHAR(255) NOT NULL,
	street_address VARCHAR(255) NOT NULL,
	city VARCHAR(255) NOT NULL,
	state VARCHAR(2) NOT NULL,
	zipcode VARCHAR(255) NOT NULL,
	numStudents VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL);


