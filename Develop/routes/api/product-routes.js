const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    // find all products and include their associated Category and Tag data
    const products = await Product.findAll({ include: [{ model: Category }, { model: Tag }] });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    // find a single product by its `id` and include its associated Category and Tag data
    const product = await Product.findByPk(req.params.id, { include: [{ model: Category }, { model: Tag }] });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    // create a new product
    const newProduct = await Product.create(req.body);
    // if there are product tags, create pairings to bulk create in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tagId) => ({
        product_id: newProduct.id,
        tag_id: tagId,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Bad request' });
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    // update product data
    const updatedProduct = await Product.update(req.body, { where: { id: req.params.id } });
    // if there are product tags
    if (req.body.tagIds && req.body.tagIds.length) {
      // fetch current product tags
      const currentProductTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
      // create filtered list of new tag ids
      const newProductTagIds = req.body.tagIds.filter((tagId) => !currentProductTags.map((tag) => tag.tag_id).includes(tagId));
      // create filtered list of product tags to remove
      const productTagsToRemove = currentProductTags.filter((tag) => !req.body.tagIds.includes(tag.tag_id));
      // remove product tags
      await ProductTag.destroy({ where: { id: productTagsToRemove.map((tag) => tag.id) } });
      // create new product tags
      await ProductTag.bulkCreate(newProductTagIds.map((tagId) => ({ product_id: req.params.id, tag_id: tagId })));
    }
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Bad request' });
  }
});

// delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // delete a product by its `id` value
    const deletedProduct = await Product.destroy({ where: { id: req.params.id } });
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
