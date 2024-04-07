// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize instance created in the connection.js file
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// Set up fields and rules for Product model
Product.init(
  {
    // Define the 'id' column
    id: {
      type: DataTypes.INTEGER,     // Data type is INTEGER
      primaryKey: true,            // Set as primary key
      autoIncrement: true,         // Enable auto-increment
    },
    // Define the 'product_name' column
    product_name: {
      type: DataTypes.STRING,      // Data type is STRING
      allowNull: false,            // Doesn't allow null values
    },
    // Define the 'price' column
    price: {
      type: DataTypes.DECIMAL(10, 2), // Data type is DECIMAL with precision 10 and scale 2
      allowNull: false,              // Doesn't allow null values
    },
    // Define the 'stock' column
    stock: {
      type: DataTypes.INTEGER,    // Data type is INTEGER
      allowNull: false,           // Doesn't allow null values
      defaultValue: 10            // Default value is 10
    },
    // Define the 'category_id' column
    category_id: {
      type: DataTypes.INTEGER,    // Data type is INTEGER
      allowNull: true             // Allows null values (to be set later)
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
