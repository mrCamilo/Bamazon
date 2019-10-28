DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE table products( 
    id INT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price INT,
    stock_quantity INT,
    PRIMARY KEY (id)
);

--  Populate this database with some products
Select * FROM products;

INSERT INTO products (id, product_name, department_name, price, stock_quantity) 
VALUES (124, "Tims", "clothing", 100, 15),
	   (1518, "JESUS IS KING - VINYL", "Music", 30, 100),
       (36, "Black Air Forces", "clothing", 70, 22),
       (1317, "MLB 19 The Show", "videogames", 30, 41),
       (1428, "Modern Warfare", "videogames", 59.99, 10),
       (12, "Dragon Quest XI", "videogames", 59.99, 6),
       (126, "Confessions of a Mask by Yukio Mishima", "books", 12, 0),
       (1997, "Berserk - Volume 23", "books", 14, 2),
       (630, "EXPLOSIVE CALISTHENICS", "books", 23, 7),
       (1350, "Taxi Driver - bluray", "movies", 20, 6);
       
UPDATE products SET stock_quantity = stock_quantity - 1  WHERE id =  124;