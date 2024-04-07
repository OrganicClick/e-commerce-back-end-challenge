// Import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Define associations between models

// Define association: Product belongs to Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // Use category_id as foreign key in Product table
});

// Define association: Category has many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', // Use category_id as foreign key in Product table
});

// Define association: Product belongs to many Tags through ProductTag
Product.belongsToMany(Tag, {
  through: ProductTag, // Use ProductTag as intermediary table
  foreignKey: 'product_id', // Use product_id as foreign key in ProductTag table
});

// Define association: Tag belongs to many Products through ProductTag
Tag.belongsToMany(Product, {
  through: ProductTag, // Use ProductTag as intermediary table
  foreignKey: 'tag_id', // Use tag_id as foreign key in ProductTag table
});

// Export all models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
