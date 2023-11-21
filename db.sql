-- Create the database if not exists
CREATE DATABASE IF NOT EXISTS my_database;

-- Use the created database
USE my_database;

-- Create the charging_stations table with auto-increment ID
CREATE TABLE charging_stations (
    `ID` INT AUTO_INCREMENT PRIMARY KEY,
    `Municipality` VARCHAR(255),
    `Name` VARCHAR(255),
    `Address` VARCHAR(255),
    `Operation` VARCHAR(10),
    `Latitude` DECIMAL(10, 6),
    `Longitude` DECIMAL(10, 6),
    `Capacity` INT
);

-- Insert data into the charging_stations table
INSERT INTO charging_stations (`Municipality`, `Name`, `Address`, `Operation`, `Latitude`, `Longitude`, `Capacity`)
VALUES
    ('Strovolos', 'Stovolou - Kantaras Junction', '144 Stovolou Avenue, Strovolos, Nicosia', '24h', 35.140799, 33.337528, 50),
    ('Nicosia', 'EAC Nicosia Area Office', '15 Foti Pitta Street, 1508, Nicosia', '24h', 35.164367, 33.362053, 150),
    ('Aglantzia', 'Kyrinias-Mpoumpoulinas Junction', 'Corner of Kyrinias Ave. And Bouboulinas Str.', '24h', 35.148981, 33.389477, 300),
    ('Engomi', 'Lefkotheou - Papakyriakou Junction', 'Lefkotheou Avenue, Engomi, Nicosia', '24h', 35.148033, 33.316216, 300),
    ('Strovolos', 'EAC Head Office', '11 Amfipoleos Street, Strovolos, 2025, Nicosia', '24h', 35.138809, 33.373362, 25),
    ('Latsia', 'Latsia Municipality Bldg', '57 Giannou Kranidioti Avenue, Latsia, Nicosia', '24h', 35.107389, 33.378194, 25),
    ('Aglantzia', 'University of Cyprus Campus', 'University of Cyprus Campus', '24h', 35.146226, 33.415333, 25),
    ('Platres', 'Michael Nicolaides Square', 'Olympou Street, Pano Platres, Limassol', '24h', 34.892158, 32.867484, 25),
    ('Limassol', 'Enaerios Parking Area', 'Makariou III Avenue, Limassol', '24h', 34.684747, 33.059271, 25),
    ('Limassol', 'Epichosi Area', 'Spyrou Araouzou Street, Limassol', '24h', 34.673417, 33.304562, 50),
    ('Ag. Athanasios', 'Agios Athanasios Municipality', 'Avraam Street, Agios Athanasios, Cyprus', '24h', 34.708582, 33.050497, 50),
    ('Parekklisia', 'Parking Area (Chesters)', '194 Amathoundos Avenue, Parekklisia, Limassol', '24h', 34.714739, 33.163145, 150),
    ('Larnaca', 'Parking Area at Old Market Place', 'Tasou Mitsopoulou Street, Larnaca', '24h', 34.897398, 33.638181, 100),
    ('Larnaca', 'Larnaca International Airport', 'Larnaca International Airport', '24h', 34.871446, 33.606871, 100),
    ('Paralimni', 'Paralimni Amphitheatre', 'Agiou Georgiou Street, Paralimni, Ammochostos', '24h', 35.040084, 33.983864, 50),
    ('Protaras', 'Protaras CTO Office Parking Area', '14 Protaras Avenue, Paralimni, Ammochostos', '24h', 35.016806, 34.049173, 100),
    ('Paphos', 'EAC Paphos Area Office', '87 Eleftheriou Venizelou Street, 8100, Paphos', '24h', 34.783821, 32.443699, 50),
    ('Paphos', 'Paphos International Airport', 'Paphos International Airport', '24h', 34.71127, 32.489487, 300),
    ('Polis Chrysohous', 'Polis CTO Offices Parking Area', 'Griva Digeni Street, Polis', '24h', 35.033782, 32.42541, 25);
