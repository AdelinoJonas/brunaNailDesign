CREATE DATABASE appbrunanail_db
DROP DATABASE appbrunanail_db

DROP table knex_migrations;
DROP table knex_migrations_lock;

DROP table services;
DROP table users;
DROP table schedules;
DROP table appointment;


CREATE TABLE users (
    user_id int not null primary key AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    is_admin BOOLEAN
);


drop table users

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE,
    price NUMERIC(10, 2),
    duration TIME,
    description TEXT,
    image VARCHAR(255),
    is_course BOOLEAN
);


CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    days_available VARCHAR(255) UNIQUE,
    start_time TIME,
    end_time TIME,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    schedule_id INT REFERENCES schedules(id),
    time TIME,
    service_id INT REFERENCES services(id),
    client_id INT REFERENCES clients(id),
    CONSTRAINT fk_schedule FOREIGN KEY (schedule_id) REFERENCES schedules(id),
    CONSTRAINT fk_service FOREIGN KEY (service_id) REFERENCES services(id),
    CONSTRAINT fk_client FOREIGN KEY (client_id) REFERENCES clients(id)
);

ALTER TABLE appointments ALTER COLUMN user_id TYPE integer;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SELECT gen_random_uuid();


ALTER TABLE appointments DROP COLUMN schedule_date;

INSERT INTO users (name, email, phone, password, is_admin) 
VALUES 
    ('Nome do Usuário', 'usuario@email.com', '1234567890', 'senha123', true),
    ('Outro Usuário', 'outro@email.com', '9876543210', 'senha456', false);

INSERT INTO services (title, price, duration, description, image, isCourse)
VALUES 
    ('Serviço 1', 150.00, '08:00:00', 'Descrição do Serviço 1', 'https://s3.amazonaws.com/minha-imagem-1.jpg', false),
    ('Serviço 2', 175.00, '18:00:00', 'Descrição do Serviço 2', 'https://s3.amazonaws.com/minha-imagem-2.jpg', true);

INSERT INTO schedules (days_available, start_time, end_time)
VALUES 
    ('Segunda, Quarta, Sexta', '08:00:00', '17:00:00'),
    ('Terça, Quinta', '09:00:00', '18:00:00');

INSERT INTO appointments (schedule_id, time, service_id, user_id)
VALUES 
    (1, '08:00:00', 1, 1),
    (2, '09:00:00', 2, 2);