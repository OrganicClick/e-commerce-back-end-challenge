const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  // Drop ProductTag table first
  await sequelize.query('DROP TABLE IF EXISTS `ProductTag`');
  console.log('\n----- PRODUCT TAG TABLE DROPPED -----\n');

  // Drop Product table next
  await sequelize.query('DROP TABLE IF EXISTS `Product`');
  console.log('\n----- PRODUCT TABLE DROPPED -----\n');

  // Drop Tag table
  await sequelize.query('DROP TABLE IF EXISTS `Tag`');
  console.log('\n----- TAG TABLE DROPPED -----\n');

  // Drop any other tables if needed

  // Proceed with seeding
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();
