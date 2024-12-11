CREATE TABLE reserver(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nom_maison VARCHAR(150),
    prix_maison VARCHAR(100)
);

INSERT INTO reserver(nom_maison,prix_maison) VALUES ("Maison au bord de la mer", 150);