# 📋 TaskManager — Application de Gestion des Tâches

Application web complète de gestion des tâches développée dans le cadre d'un TP OFPPT
(Filière **Développement Digital Full Stack**).

Stack technique : **Node.js / Express.js / MySQL** (backend, architecture MVC) et
**React.js (Vite) / Axios** (frontend).

---

## 📁 Arborescence du projet

```
TaskManager/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── taskModel.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Alert.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskTable.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── taskService.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── database/
│   └── taskmanager.sql
│
└── postman/
    └── TaskManager.postman_collection.json
```

---

## ⚙️ Prérequis

- [Node.js](https://nodejs.org/) version 18 ou supérieure
- [MySQL](https://www.mysql.com/) (ou MariaDB / XAMPP / WAMP)
- npm (installé avec Node.js)
- Postman (optionnel, pour tester l'API)

---

## 🗄️ 1. Configuration de la base de données MySQL

1. Démarrer le serveur MySQL (via XAMPP, WAMP, ou en ligne de commande).
2. Ouvrir un terminal / MySQL Workbench / phpMyAdmin et exécuter le script SQL fourni :

```bash
mysql -u root -p < database/taskmanager.sql
```

Ce script effectue automatiquement :
- La création de la base de données `TaskManager`
- La création de la table `Task`
- L'insertion d'un jeu de données d'exemple (6 tâches)

### Structure de la table `Task`

| Champ          | Type          | Description                          |
|----------------|---------------|---------------------------------------|
| id             | INT (PK, AI)  | Identifiant unique de la tâche       |
| titre          | VARCHAR(100)  | Titre de la tâche                    |
| description    | TEXT          | Description détaillée                |
| statut         | VARCHAR(20)   | "En cours" ou "Terminée"             |
| date_creation  | DATE          | Date de création de la tâche         |

---

## 🚀 2. Lancement du Backend (Node.js / Express)

```bash
cd backend
npm install
```

### Configuration

Copier le fichier `.env.example` en `.env` et adapter les valeurs si nécessaire :

```bash
cp .env.example .env
```

Contenu du fichier `.env` :

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=TaskManager
DB_PORT=3306
```

> ⚠️ Adapter `DB_USER` et `DB_PASSWORD` selon votre configuration MySQL locale.

### Démarrage du serveur

```bash
# Mode développement (avec rechargement automatique via nodemon)
npm run dev

# OU mode production
npm start
```

Le serveur démarre sur : **http://localhost:5000**

Vous devez voir dans la console :
```
✅ Connexion à la base de données MySQL réussie (TaskManager)
✅ Serveur TaskManager démarré sur http://localhost:5000
```

---

## 💻 3. Lancement du Frontend (React + Vite)

Dans un **second terminal** :

```bash
cd frontend
npm install
npm run dev
```

L'application React démarre sur : **http://localhost:5173**

Ouvrir cette adresse dans le navigateur pour accéder à l'interface.

---

## 🔌 4. API REST — Endpoints disponibles

| Méthode | Endpoint                     | Description                          |
|---------|-------------------------------|---------------------------------------|
| GET     | `/tasks`                      | Retourne toutes les tâches            |
| GET     | `/tasks/stats`                | Retourne les statistiques (dashboard) |
| GET     | `/tasks/:id`                  | Retourne une tâche par son ID         |
| POST    | `/tasks/addTask`               | Ajoute une nouvelle tâche             |
| PUT     | `/tasks/updateTask/:id`        | Modifie une tâche existante           |
| DELETE  | `/tasks/deleteTask/:id`        | Supprime une tâche                    |

### Exemple — Ajouter une tâche (POST /tasks/addTask)

```json
{
  "titre": "Préparer la soutenance",
  "description": "Finaliser le rapport et les slides",
  "statut": "En cours"
}
```

### Exemple — Modifier une tâche (PUT /tasks/updateTask/:id)

```json
{
  "titre": "Préparer la soutenance (mise à jour)",
  "description": "Rapport terminé",
  "statut": "Terminée"
}
```

---

## 🧪 5. Tests avec Postman

Une collection Postman complète est fournie dans :

```
postman/TaskManager.postman_collection.json
```

### Importer la collection
1. Ouvrir Postman
2. Cliquer sur **Import**
3. Sélectionner le fichier `TaskManager.postman_collection.json`
4. La variable `{{baseUrl}}` est déjà configurée sur `http://localhost:5000`

La collection contient des requêtes pour :
- ✅ GET toutes les tâches
- ✅ GET statistiques
- ✅ GET une tâche par ID
- ✅ POST ajout d'une tâche (cas valide + cas d'erreur de validation)
- ✅ PUT modification d'une tâche (cas valide + cas tâche inexistante)
- ✅ DELETE suppression d'une tâche (cas valide + cas tâche inexistante)

---

## 🖥️ 6. Fonctionnalités de l'interface React

- **Tableau de bord** : nombre total de tâches, tâches en cours, tâches terminées, taux de complétion
- **Tableau des tâches** : affichage de toutes les tâches avec ID, titre, description, statut et date
- **Filtrage** : par statut (Toutes / En cours / Terminée)
- **Ajout de tâche** : formulaire modal avec validation (titre obligatoire, max 100 caractères)
- **Modification de tâche** : formulaire pré-rempli
- **Suppression de tâche** : avec boîte de confirmation
- **Notifications** : messages de succès / erreur après chaque action
- **Design responsive** : adapté aux écrans mobiles, tablettes et ordinateurs

---

## 🏗️ 7. Architecture du Backend (MVC)

- **Models** (`models/taskModel.js`) : requêtes SQL vers MySQL
- **Controllers** (`controllers/taskController.js`) : logique métier, validation des données, gestion des erreurs
- **Routes** (`routes/taskRoutes.js`) : définition des endpoints de l'API
- **Config** (`config/database.js`) : connexion au pool MySQL
- **Middlewares** (`middlewares/errorHandler.js`) : gestion centralisée des erreurs et routes 404

---

## ✅ 8. Checklist finale avant compression en ZIP

Avant d'envoyer le projet au professeur, vérifier que :

- [ ] Le dossier `node_modules` est **supprimé** dans `backend/` et `frontend/` (pour réduire la taille du ZIP)
- [ ] Le fichier `.env` (avec vos identifiants MySQL) **n'est pas inclus** — seul `.env.example` doit rester
- [ ] Le script `database/taskmanager.sql` s'exécute sans erreur sur MySQL
- [ ] `cd backend && npm install && npm run dev` démarre le serveur sans erreur
- [ ] `cd frontend && npm install && npm run dev` démarre l'interface React sans erreur
- [ ] La page `http://localhost:5173` affiche bien le tableau de bord et la liste des tâches
- [ ] Les opérations CRUD (ajout, modification, suppression) fonctionnent depuis l'interface
- [ ] La collection Postman fonctionne sur les 4 endpoints principaux (GET, POST, PUT, DELETE)
- [ ] Le README.md est inclus à la racine du projet

### Commande pour créer le ZIP (depuis la racine `TaskManager/`)

```bash
# Supprimer les dépendances avant compression
rm -rf backend/node_modules frontend/node_modules

# Créer le ZIP
zip -r TaskManager.zip . -x "*.env"
```

---

## 👨‍🎓 Auteur

Projet réalisé par un étudiant **OFPPT — Développement Digital Full Stack**, dans le cadre
d'un TP de synthèse (Base de données, Backend Node.js/Express, Frontend React).
