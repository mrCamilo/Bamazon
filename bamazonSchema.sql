DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE table products( 
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price INT,
    stock_quantity INT,
    PRIMARY KEY (id)
);

--  Populate this database with some products
Select * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Tims", "clothing", 100, 15),
	   ("JESUS IS KING - VINYL", "Music", 30, 100),
       ("Black Air Forces", "clothing", 70, 22),
       ("MLB 19 The Show", "videogames", 30, 41),
       ("Modern Warfare", "videogames", 59.99, 10),
       ("Dragon Quest XI", "videogames", 59.99, 6),
       ("Confessions of a Mask - Yukio Mishima", "books", 12, 0),
       ("Berserk - Volume 23", "books", 14, 2),
       ("EXPLOSIVE CALISTHENICS", "books", 23, 7),
       ("Taxi Driver - bluray", "movies", 20, 6)

