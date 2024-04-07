// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize instance created in the connection.js file
const sequelize = require('../config/connection.js');

// Define the Category model as a subclass of Sequelize's Model class
class Category extends Model {}

// Initialize the Category model with column definitions and configuration options
Category.init(
  {
    // Define the 'id' column
    id: {
      type: DataTypes.INTEGER,   // Data type is INTEGER
      primaryKey: true,          // Set as primary key
      autoIncrement: true,       // Enable auto-increment
    },
    // Define the 'category_name' column
    category_name: {
      type: DataTypes.STRING,    // Data type is STRING
      allowNull: false,          // Doesn't allow null values
    }
  },
  {
    // Configure Sequelize to use the specified sequelize instance
    sequelize,
    // Disable timestamps (createdAt and updatedAt columns)
    timestamps: false,
    // Freeze the table name (prevent Sequelize from pluralizing it)
    freezeTableName: true,
    // Use underscored naming convention for columns and table names
    underscored: true,
    // Specify the model name as 'category'
    modelName: 'category',
  }
);

// Export the Category model for use in other parts of the application
module.exports = Category;
