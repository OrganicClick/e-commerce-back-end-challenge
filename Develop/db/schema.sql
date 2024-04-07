-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

-- Select the ecommerce_db database for subsequent operations
USE ecommerce_db;

-- Create a table to store categories
CREATE TABLE Category (
    id INT NOT NULL AUTO_INCREMENT,         -- Unique identifier for the category
    category_name VARCHAR(255) NOT NULL,    -- Name of the category
    PRIMARY KEY (id)                        -- Primary key constraint on id column
);

-- Create a table to store products
CREATE TABLE Product (
    id INT NOT NULL AUTO_INCREMENT,             -- Unique identifier for the product
    product_name VARCHAR(255) NOT NULL,        -- Name of the product
    price DECIMAL(10, 2) NOT NULL,             -- Price of the product
    stock INT NOT NULL DEFAULT 10,              -- Stock quantity of the product (default value is 10)
    category_id INT,                            -- Foreign key referencing the Category table
    PRIMARY KEY (id),                           -- Primary key constraint on id column
    FOREIGN KEY (category_id) REFERENCES Category(id)  -- Foreign key constraint referencing the id column of the Category table
);

-- Create a table to store tags
CREATE TABLE Tag (
    id INT NOT NULL AUTO_INCREMENT,         -- Unique identifier for the tag
    tag_name VARCHAR(255) NOT NULL,        -- Name of the tag
    PRIMARY KEY (id)                        -- Primary key constraint on id column
);

-- Create a table to establish a many-to-many relationship between products and tags
CREATE TABLE ProductTag (
    id INT NOT NULL AUTO_INCREMENT,             -- Unique identifier for the ProductTag entry
    product_id INT,                             -- Foreign key referencing the Product table
    tag_id INT,                                 -- Foreign key referencing the Tag table
    PRIMARY KEY (id),                           -- Primary key constraint on id column
    FOREIGN KEY (product_id) REFERENCES Product(id),  -- Foreign key constraint referencing the id column of the Product table
    FOREIGN KEY (tag_id) REFERENCES Tag(id)           -- Foreign key constraint referencing the id column of the Tag table
);
