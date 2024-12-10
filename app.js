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


app.get("/accueil", (req, res) => {
    const introText = "Explorez une sélection de maisons uniques, parfaites pour vos vacances, vos séjours professionnels ou vos escapades en famille. Que vous rêviez de vous détendre au bord de la mer, de profiter d'une retraite tranquille à la montagne, ou de découvrir une ville vibrante, nous avons la maison idéale pour vous.";
    const headerImage = "/images/maison-bord-mer-floride.jpg"; // Chemin dynamique vers l'image

    res.render('accueil', { introText, headerImage });
});


app.get("/reservation", (req,res) => {
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

    const clients = [
        {id: 1, name: 'Alice Dupont'},
        {id: 2, name: 'Jean Martin'},
        {id: 3, name: 'Claire Oceane'}
    ];

    res.render('reservation', {properties, clients});
});


app.get("/terms", (req, res) => {

    const introText = "Vous devez avoir au moins 18 ans pour effectuer une réservation. Toute réservation doit être effectuée par une personne juridiquement capable d'engager un contrat."
    res.render("terms",{introText});  
});

app.get('/contact', (req, res) => {
    const coordonnees = {
        numero: "89 67 45 23 01",
        horaire: "Lundi - Vendredi : 07h00 - 20h00 et Samedi : 07h00 - 18h00",
    };
    res.render('contact', { coordonnees });
});


app.get("/about", (req, res) => {

    const introText = "Nous sommes fiers de vous offrir une solution simple, fiable et conviviale pour réserver la maison ou l'appartement de vos rêves, que ce soit pour vos vacances, vos voyages d'affaires, ou toute autre occasion spéciale. Notre mission est de rendre la recherche et la réservation de propriétés aussi agréables que le séjour lui-même."
    res.render("about", {introText});
});


module.exports = app;

