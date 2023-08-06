// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Tags belongToMany Products (through ProductTag)
Product.belongsTo(Category)
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tagId' });
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'productId' });
Category.hasMany(Product)




module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
