// Import functions to seed categories, products, tags, and product tags
const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

// Import Sequelize connection
const sequelize = require('../config/connection');

// Define function to seed all tables
const seedAll = async () => {
  // Synchronize database schema and drop existing tables
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  // Seed categories table
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  // Seed products table
  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  // Seed tags table
  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  // Seed product tags table
  await seedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  // Exit the script after seeding
  process.exit(0);
};

// Execute the seeding function
seedAll();
