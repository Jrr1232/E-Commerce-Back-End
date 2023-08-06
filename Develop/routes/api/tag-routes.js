const router = require('express').Router();
const { async } = require('validate.js');
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(tagData);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  await Tag.findOne(
    {

      where: {
        id: req.params.id
      },
    }
  ).then((product) => {
    res.json(product);
  });
});

router.post('/', async (req, res) => {
  // create a new tag
  await Tag.create({
    tag_name: req.body.tag_name,

  })
    .then((newTag) => {
      // Send the newly created row as a JSON object
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  await Tag.update(
    {
      // All the fields you can update and the data attached to the request body.
      tag_name: req.body.tag_name,

    },
    {
      // Gets the books based on the isbn given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updateTag) => {
      // Sends the updated book as a json response
      res.json(updateTag);
    })
    .catch((err) => res.json(err));

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  await Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));

});

module.exports = router;
