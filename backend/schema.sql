USE guidex;

CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('school', 'administrator','coordinator','guide','visitor') NOT NULL,
    school_name VARCHAR(255) 
);

CREATE TABLE IF NOT EXISTS appointment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    city VARCHAR(50) NOT NULL,
    visitors INT NOT NULL,
    GM VARCHAR(255) NOT NULL,
    GM_phone VARCHAR(17) NOT NULL,
    GM_email VARCHAR(255) NOT NULL,
    note TEXT,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

INSERT INTO user (name, email, password, role, school_name)
VALUES ('Alice Smith', 'alice.smith@example.com', 'pass', 'school', 'Bilkent University');

INSERT INTO user (name, email, password, role)
VALUES ('Bob Johnson', 'bob.johnson@example.com', 'pass', 'administrator');

INSERT INTO appointment (user_id, date, time, city, visitors, GM, GM_phone, GM_email, note) 
VALUES (1, '2024-12-15', '10:00:00', 'Ankara', 5, 'General Manager', '+90 506 123 4567', 'gm@example.com', 'Important meeting');