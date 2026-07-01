
-- Financial Control Database
-- Author: Giada Chiara
-- Description:
-- Database schema for the Financial Control application.
----------------------------------------------------------

CREATE DATABASE IF NOT EXISTS pocket
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE financial_control;

----------------------------------------------------------
-- TABLE: users
----------------------------------------------------------

CREATE TABLE `users` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
    `name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
    `surname` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
    `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

----------------------------------------------------------
-- TABLE: transactions
----------------------------------------------------------

CREATE TABLE `transactions` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `user_id` bigint NOT NULL,
    `category` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
    `type` enum('entrata','spesa','transfer') COLLATE utf8mb4_general_ci NOT NULL,
    `amount` decimal(10,2) NOT NULL,
    `description` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
    `date` date NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_user` (`user_id`),
    CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

----------------------------------------------------------
-- TABLE: budgets
----------------------------------------------------------

CREATE TABLE `budgets` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `user_id` bigint NOT NULL,
    `start_date` date NOT NULL,
    `limit_amount` decimal(10,2) NOT NULL,
    `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
    `end_date` date NOT NULL,
    `email_85_sent` tinyint(1) NOT NULL DEFAULT '0',
    `email_100_sent` tinyint(1) NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`),
    KEY `idx_user` (`user_id`),
    CONSTRAINT `budgets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

----------------------------------------------------------
-- TABLE: goals
----------------------------------------------------------

CREATE TABLE `goals` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `user_id` bigint NOT NULL,
    `date` date NOT NULL,
    `target_amount` decimal(10,2) NOT NULL,
    `current_amount` decimal(10,2) NOT NULL,
    `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
    `email_85_sent` tinyint(1) NOT NULL DEFAULT '0',
    `email_100_sent` tinyint(1) NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`),
    KEY `idx_user` (`user_id`),
    CONSTRAINT `goals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci


----------------------------------------------------------
-- EXTRA: for fast test
----------------------------------------------------------

----------------------------------------------------------
-- DEMO USER
-- Password: replace with your generated password hash
----------------------------------------------------------

INSERT INTO users (id, name, surname, email, password)
VALUES
(
    1,
    'John',
    'Doe',
    'john.doe@example.com',
    '$2y$10$REPLACE_WITH_YOUR_PASSWORD_HASH'
);

----------------------------------------------------------
-- GOALS
----------------------------------------------------------

INSERT INTO goals
(user_id, date, target_amount, current_amount, description)
VALUES
(1, '2026-12-23', 5000.00, 1850.00, 'Fondo '),
(1, '2026-07-15', 1200.00, 900.00, 'Nuovo Laptop'),

(1, '2027-07-04', 3500.00, 950.00, 'Vacanze estive');

----------------------------------------------------------
-- BUDGETS
----------------------------------------------------------

INSERT INTO budgets
(user_id, start_date, end_date, limit_amount, description)
VALUES

(1,
'2026-07-15',
'2026-07-25',
900.00,
'Evento sportivo'),

(1,
'2026-08-02',
'2026-08-30',
1000.00,
'Vacanze');

----------------------------------------------------------
-- TRANSACTIONS
----------------------------------------------------------

INSERT INTO transactions
(user_id, category, type, amount, description, date)
VALUES

(1,'Stipendio','entrata',2500.00,'Stipendio mensile','2026-07-01'),

(1,'Lavoro freelance','entrata',450.00,'Progetto sito web','2026-07-05'),

(1,'Spesa alimentare','spesa',82.50,'Supermercato','2026-07-03'),

(1,'Ristorante','spesa',38.90,'Cena con amici','2026-07-04'),

(1,'Trasporti','spesa',45.00,'Abbonamento mensile autobus','2026-07-06'),

(1,'Utenze','spesa',112.80,'Bolletta della luce','2026-07-08'),

(1,'Shopping','spesa',95.40,'Vestiti','2026-07-10'),

(1,'Intrattenimento','spesa',29.99,'Servizi di streaming','2026-07-11'),

(1,'Salute','spesa',54.30,'Farmacia','2026-07-13'),

(1,'Carburante','spesa',70.00,'Rifornimento auto','2026-07-15'),

(1,'Spesa alimentare','spesa',76.40,'Spesa settimanale','2026-07-18'),

(1,'Ristorante','spesa',41.20,'Serata pizza','2026-07-20'),

(1,'Trasferimento','transfer',300.00,'Trasferimento ai risparmi','2026-07-21'),

(1,'Regalo','spesa',65.00,'Regalo di compleanno','2026-07-22'),

(1,'Stipendio','entrata',2500.00,'Stipendio mensile','2026-08-01'),

(1,'Spesa alimentare','spesa',88.60,'Supermercato','2026-08-02'),

(1,'Utenze','spesa',118.40,'Bolletta dell''acqua','2026-08-05'),

(1,'Intrattenimento','spesa',19.99,'Cinema','2026-08-08'),

(1,'Carburante','spesa',68.00,'benzina','2026-08-10'),

(1,'Shopping','spesa',149.90,'Acquisto elettronici','2026-08-15');