--LAB1A
--Part1
-- 2. create users and status tables
CREATE TABLE users (
id SERIAL PRIMARY KEY,
first_name varchar(255),
last_name varchar(255),
email varchar(255) NOT NULL,
password varchar(255) NOT NULL,
created_at TIMESTAMP,
updated_at TIMESTAMP
);

CREATE TABLE status (
id SERIAL PRIMARY KEY,
description varchar(255) NOT NULL,
created_at TIMESTAMP,
updated_at TIMESTAMP
);

-- 3. create inventory table
CREATE TABLE inventory (
id SERIAL PRIMARY KEY,
status_id INTEGER, 
description varchar(255),
created_at TIMESTAMP,
updated_at TIMESTAMP,
FOREIGN KEY (status_id) REFERENCES status(id)
);

-- 4. create transactions table
CREATE TABLE transactions (
id SERIAL PRIMARY KEY,
user_id INTEGER,
inventory_id INTEGER,
checkout_time TIMESTAMP NOT NULL,
scheduled_checkin_time TIMESTAMP,
actual_checkin_time TIMESTAMP,
created_at TIMESTAMP,
updated_at TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (inventory_id) REFERENCES inventory(id)
);

-- Insert records
-- 5. insert 5 records into users table
INSERT INTO users (first_name, last_name, email, password) VALUES ('Ben', 'Zin', 'benZin@hotmail.com', 'pw999');
INSERT INTO users (first_name, last_name, email, password) VALUES ('John', 'Doe', 'jDoe@hotmail.com', 'pw999');
INSERT INTO users (last_name, email, first_name, password) VALUES ('Doe', 'JonD@hotmail.com', 'Jon', 'pw999');
INSERT INTO users (first_name, last_name, email, password) VALUES ('Eric', 'Jenkins', 'EricJ@hotmail.com', 'pw999');
INSERT INTO users (first_name, last_name, email, password) VALUES ('Kevin', 'Tran', 'kevtran@hotmail.com', 'pw999');

-- 6. insert 5 records into status table
INSERT INTO status (description) VALUES 
('Available'),
('Under Repair'),
('Overdue'),
('Unavailable'),
('Checked out');

-- 7. insert 5 records into inventory table
INSERT INTO inventory (status_id, description) VALUES 
(1 ,'Webcam1'),
(2 ,'Microphone1'),
(3 ,'Laptop2'),
(4 ,'TV1'),
(5 ,'Laptop1');

-- 8. insert 3 records into transactions table. Then update the descriptions of those records to "Checked out" in inventory table
INSERT INTO transactions (user_id, inventory_id, checkout_time , scheduled_checkin_time) VALUES (1, 2, NOW(), '2024-06-01');
INSERT INTO transactions (user_id, inventory_id, checkout_time) VALUES (1, 1, NOW());
INSERT INTO transactions (user_id, inventory_id, checkout_time, scheduled_checkin_time) VALUES (2, 3, NOW(), '2024-06-02');
UPDATE inventory SET status_id = 5 WHERE id IN (1, 2, 3);

-- 9. Add column signed_agreement to users table
ALTER TABLE users ADD COLUMN signed_agreement BOOLEAN DEFAULT false;

-- 10. write a query that returns a list of all the equipment and its scheduled_checkin_time that is checked out ordered by scheduled_checkin_time in descending order
SELECT i.description, t.scheduled_checkin_time
FROM inventory i
JOIN transactions t ON i.id = t.inventory_id
JOIN status s ON i.status_id = s.id
WHERE s.description = 'Checked out'
ORDER BY t.scheduled_checkin_time DESC;

-- 11. write a query that returns a list of all equipment due after May 31 2023
SELECT i.description, t.scheduled_checkin_time
FROM inventory i
JOIN transactions t ON i.id = t.inventory_id
WHERE t.scheduled_checkin_time > '2023-05-31'
ORDER BY t.scheduled_checkin_time;

-- 12. write a query that returns a count of the number of items with a status of "Checked out" by user_id 1
SELECT count(*) AS checked_out_count 
FROM inventory i
JOIN transactions t ON i.id = t.inventory_id
JOIN status s ON i.status_id = s.id
WHERE t.user_id = 1 AND s.description = 'Checked out';


--LAB1B
--Part2
-- 1. Views
-- 1.a. insert 20 transations
INSERT INTO transactions (user_id, inventory_id, checkout_time , scheduled_checkin_time, actual_checkin_time) VALUES 
(1, 2, NOW(), '2024-06-01', '2024-06-03'),
(1, 3, '2023-09-01', '2024-06-01', '2024-06-05'),
(3, 2, NOW(), '2024-06-01', '2024-06-07'),
(1, 5, '2022-11-15', '2024-02-01', '2024-01-30'),
(1, 4, NOW(), '2024-03-19', '2024-03-15'),
(2, 5, '2022-11-01', '2023-11-01', '2023-10-25'),
(2, 4, '2022-11-01', '2024-01-31', '2023-05-01'),
(2, 3, NOW(), '2024-03-01', '2024-02-05'),
(2, 2, '2022-11-01', '2024-05-05', '2024-04-07'),
(3, 1, '2022-01-15', '2024-06-05', '2024-05-03'),
(3, 2, '2022-11-01', '2024-06-21', '2024-06-10'),
(3, 3, NOW(), '2024-04-15', '2024-03-07'),
(4, 1, '2022-07-17', '2024-03-11', '2024-03-15'),
(4, 2, '2022-08-05', '2023-11-01', '2023-10-25'),
(4, 3, '2022-11-01', '2024-05-31', '2024-05-01'),
(4, 5, '2022-11-01', '2024-03-01', '2024-02-05'),
(5, 1, '2022-11-01', '2024-05-05', '2024-04-07'),
(5, 2, '2022-11-01', '2024-06-05', '2024-05-03'),
(5, 3, '2022-11-01', '2024-03-21', '2024-04-10'),
(5, 5, '2022-11-01', '2024-04-15', '2024-03-07');

-- 1.b. create late_checkins view
CREATE VIEW late_checkins AS
SELECT t.user_id, t.inventory_id, i.description, COUNT(*) AS late_checkin_count
FROM transactions t
JOIN inventory i ON t.inventory_id = i.id
WHERE t.actual_checkin_time > t.scheduled_checkin_time
GROUP BY t.user_id, t.inventory_id, i.description;

-- 1.c. test late_checkins view
SELECT * FROM late_checkins;






