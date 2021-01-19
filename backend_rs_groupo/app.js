const helmet = require('helmet'); // Protection certaines vulnérabilités connues du web en configurant correctement les headers
const dotenv = require('dotenv').config();/* Initialisation de dotenv (permet de masquer les données sur notre environnement de développement
                                            (ici adresse et mot de passe de notre base de donnée.)*/

const cors = require('cors'); /* contourner les erreur de CORS (Système de sécurité CORS : Cross Origin Resource Sharing  
  La sécurité CORS est une mesure de sécurité par défaut pour empêcher 
  l'utilisation de ressources par des origines non-autorisées.*/

const express = require('express'); // Framework pour Node.js
// eslint-disable-next-line import/no-extraneous-dependencies
//const bodyParser = require('body-parser'); // Parser JSON pour rendre exploitables les objets retournés

const path = require('path'); // Nécessaire pour Multer (importation d'image )

const postRoutes = require('./routes/post'); // Déclaration du chemin pour les routes posts
const userRoutes = require('./routes/user'); // Déclaration du chemin pour les routes User


const app = express();

// Création de la base et des tables si inexistantes

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use('/images',express.static(path.join(__dirname, '/images')))

var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
});

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);


module.exports = app;
