// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize instance created in the connection.js file
const sequelize = require('../config/connection.js');

// Initialize Tag model (table) by extending off Sequelize's Model class
class Tag extends Model {}

// Set up fields and rules for Tag model
Tag.init(
  {
    // Define the 'id' column
    id: {
      type: DataTypes.INTEGER,   // Data type is INTEGER
      primaryKey: true,          // Set as primary key
      autoIncrement: true,       // Enable auto-increment
    },
    // Define the 'tag_name' column
    tag_name: {
      type: DataTypes.STRING,    // Data type is STRING
      allowNull: false,          // Doesn't allow null values
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
