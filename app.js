// Ici, import du frameword ExpressJS
const express = require("express");
const mysql2 = require("mysql2");
const url = require("url");
const fs = require("fs");
const myConnection = require("express-myconnection");
const connection = require("express-myconnection");
const { title } = require("process");

const optionConnection = {
    host: "localhost",
    user: "root",
    password: "tanzelmy03@a",
    port: 3306,
    database: "restaurant",
};

// Je crée mon application ExpressJS
const app = express();

// Middleware de connection à la base de données
// 'pool' est la statégie de connection à la base de données
app.use(myConnection(mysql2, optionConnection, "pool"));

app.use(express.urlencoded({extended: false}));

// L'endroit ou se situent les vues qui saffichent sur la navigateur
app.set("views", "./views");

// Je précise le moteurde lecture de vues à savoir ejs
app.set("view engine", "ejs");

// précise le répertoire 'public' qui contient les fichiers statics
app.use(express.static("public"));

// Je vais créer une route "/accueil" en utilise la méthode de type "GET"
app.get("/accueil", (req, res) => {
    // Il définit une variable constante appelée introText contenant un message descriptif.
    const introText = "Explorez une sélection de maisons uniques, parfaites pour vos vacances, vos séjours professionnels ou vos escapades en famille. Que vous rêviez de vous détendre au bord de la mer, de profiter d'une retraite tranquille à la montagne, ou de découvrir une ville vibrante, nous avons la maison idéale pour vous.";
    const headerImage = "/images/maison-bord-mer-floride.jpg"; // Chemin dynamique vers l'image
    // Le code utilise la méthode res.render pour rendre la vue 'accueil'.
    res.render('accueil', { introText, headerImage });
});

// Définit une chemin "/reservation" en utilise la méthode "GET".
app.get("/reservation", (req,res) => {
    // Cette ligne initialise un tableau nommé properties qui est probablement utilisé pour stocker une lidte de propriétés.
    const properties = [
        {
            id: 1,
            title: 'Maison au bord de la mer',
            price:150,
            description: 'Venez vous détendre dans cette maison avec vue panoramique sur l\'océan. Parfait pour les amoureux de la nature.',
            image:'/images/ext_0_3887844.jpg'
        },
        {
            id: 2,
            title: 'Appartement en centre-ville',
            price: 100,
            description: 'Cet appartement élégant, situé dans le quartier animé du centre-ville, est idéal pour un séjour alliant confort et accessibilité.',
            image: '/images/appartement-de-luxe-moderne-avec-vue.jpg'
        },
    ];
    const clients = [  // Liste des clients disponibles pour la réservation
        {id: 1, name: 'Alice Dupont'},
        {id: 2, name: 'Jean Martin'},
        {id: 3, name: 'Claire Oceane'}
    ];
    // Rendu de la page de réservation avec les listes de propriétés et de clients.
    res.render('reservation', {properties, clients});
});

// Route pour afficher la page des conditions d'utilisation
app.get("/terms", (req, res) => {
    const introText = "Vous devez avoir au moins 18 ans pour effectuer une réservation. Toute réservation doit être effectuée par une personne juridiquement capable d'engager un contrat."
    // Rend la vue 'terms' pour les conditions d'utilisation 
    res.render("terms",{introText});  
});

// Route pour afficher la page de contact
app.get('/contact', (req, res) => {
    const coordonnees = {  // Définition des coordonnées de contact
        numero: "89 67 45 23 01",  // Numéro de téléphone
        horaire: "Lundi - Vendredi : 07h00 - 20h00 et Samedi : 07h00 - 16h00",  // Horaires de disponibilité
    };
    res.render('contact', { coordonnees }); // Rend la vue 'contact' avec les information de contact
});

// Route pour afficher la page "A propos"
app.get("/about", (req, res) => {
    // Texte d'introduction affiché sur la page "À propos".
    const introText = "Nous sommes fiers de vous offrir une solution simple, fiable et conviviale pour réserver la maison ou l'appartement de vos rêves, que ce soit pour vos vacances, vos voyages d'affaires, ou toute autre occasion spéciale. Notre mission est de rendre la recherche et la réservation de propriétés aussi agréables que le séjour lui-même."
    res.render("about", {introText});  // Rendu de la vue "about" avec l'introduction
});


module.exports = app;

