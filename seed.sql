CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30),
price DECIMAL(10,2),
stock_quantity INT(255),
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Sour Patch Kids", "Candy", 1.5, 300);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Wheat Bread", "Bakery", 3, 3);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Coffee Beans", "Dry Goods", 5, 125);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Time", "Magazines", 5, 45);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Large Brown Eggs", "Dairy", 4, 300);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Wisconsin Cheese Curds", "Dairy", 6, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Jelly Filled Donut", "Bakery", 1, 90);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Pool Floaties", "Toys", 5, 4);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Monster Energy Drink", "Beverages", 3, 500);
