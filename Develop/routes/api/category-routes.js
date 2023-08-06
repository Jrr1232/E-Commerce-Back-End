const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {// find all categories
    const categoriesData = await Category.findAll({
      include: [{ model: Product }]
    });
    console.log(categoriesData)
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    console.log(categoriesData)

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name

    });
    console.log(categoryData)
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update(
    {
      category_name: req.body.category_name,

    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((category_name) => {
      res.json(category_name);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', async (req, res) => {
  await Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
