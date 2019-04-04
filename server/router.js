const express = require('express');
const router = express.Router();
const controller = require('./controller')

router
  .route('/handleTags')
  .get(controller.getTags)
  .post(controller.newTag);
router
  .route('/handleCategories')
  .get(controller.getCategories)
  .post(controller.newCategory);
router
  .route('/handleIngredients')
  .get(controller.getIngredients)
  .post(controller.newIngredient);


module.exports = router;