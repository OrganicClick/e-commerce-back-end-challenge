// Import functions to seed categories, products, tags, and product tags
const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

// Import Sequelize connection
const sequelize = require('../config/connection');

// Define function to seed all tables
const seedAll = async () => {
  // Disable foreign key checks and drop tables. Re-enables foreign key constraints after tables dropped.
  // This logic is being included because node seeds/index.js script keeps breaking for some reason.
  sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
  .then(() => {
    // Drop ProductTag table
    return sequelize.query('DROP TABLE IF EXISTS `ProductTag`;');
  })
  .then(() => {
    // Drop Tag table
    return sequelize.query('DROP TABLE IF EXISTS `Tag`;');
  })
  .then(() => {
    // Re-enable foreign key checks
    return sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
  })
  .then(() => {
    console.log('Tables dropped successfully.');
  })
  .catch(error => {
    console.error('Error dropping tables:', error);
  });

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
