
DROP DATABASE IF EXISTS TaskManager;
CREATE DATABASE TaskManager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE TaskManager;


CREATE TABLE Task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(100) NOT NULL,
    description TEXT,
    statut VARCHAR(20) NOT NULL DEFAULT 'En cours',
    date_creation DATE NOT NULL DEFAULT (CURRENT_DATE)
);


INSERT INTO Task (titre, description, statut, date_creation) VALUES
('Conception de la base de données', 'Modéliser et créer le schéma de la base TaskManager', 'Terminée', '2025-05-01'),
('Développement de l API Backend', 'Implémenter les routes CRUD avec Express.js et MySQL', 'En cours', '2025-05-03'),
('Création de l interface React', 'Développer le frontend avec React et Axios', 'En cours', '2025-05-05'),
('Tests des API avec Postman', 'Vérifier le bon fonctionnement de toutes les routes', 'En cours', '2025-05-07'),
('Rédaction du rapport final', 'Documenter le projet et préparer la soutenance', 'En cours', '2025-05-10'),
('Déploiement de l application', 'Préparer l environnement de production', 'En cours', '2025-05-12');


SELECT * FROM Task;
