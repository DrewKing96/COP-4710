USE register;
DROP TABLE IF EXISTS rso;
CREATE TABLE rso(
RSO_id INTEGER NOT NULL auto_increment primary KEY,
RSO_name VARCHAR(255) ,
RSO_uniassociation VARCHAR(255),
numMembers INTEGER,
admin_id INTEGER,
activation INTEGER
);