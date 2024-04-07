// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize instance created in the connection.js file
const sequelize = require('../config/connection.js');

// Initialize ProductTag model (table) by extending off Sequelize's Model class
class ProductTag extends Model {}

// Set up fields and rules for ProductTag model
ProductTag.init(
  {
    // Define the 'id' column
    id: {
      type: DataTypes.INTEGER,   // Data type is INTEGER
      primaryKey: true,          // Set as primary key
      autoIncrement: true,       // Enable auto-increment
    },
    // Define the 'product_id' column
    product_id: {
      type: DataTypes.INTEGER,    // Data type is INTEGER
      allowNull: false,           // Doesn't allow null values
    },
    // Define the 'tag_id' column
    tag_id: {
      type: DataTypes.INTEGER,    // Data type is INTEGER
      allowNull: false,           // Doesn't allow null values
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',    // Changed modelName to 'product_tag'
  }
);

module.exports = ProductTag;
