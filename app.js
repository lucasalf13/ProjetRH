const express = require('express');
const session = require('express-session');
const chefRoutes = require('./src/routes/chefRoutes');
const mainRoutes = require('./src/routes/mainRoutes');
const employeRoutes = require('./src/routes/employeRoutes');
const pcRoutes = require('./src/routes/pcRoutes');

const app = express();

app.set('views','./src/views'); // Chemin vers les vues
app.use(express.static("./public")); // Middleware pour servir les fichiers statiques
app.use(express.urlencoded({ extended: true })); // Middleware pour parser les données des formulaires
app.use(session({ // Middleware pour gérer les sessions
  secret: 'vamosnadalos', // Clé secrète pour signer les sessions
  resave: true, // Re-sauvegarder la session même si elle n'a pas été modifiée
  saveUninitialized: true // Ne pas sauvegarder les sessions non initialisées
}));


app.use(chefRoutes);
app.use(mainRoutes);
app.use(employeRoutes);
app.use(pcRoutes);
app.listen(3000, () => {
    console.log('Le serveur écoute sur le port 3000');
    });