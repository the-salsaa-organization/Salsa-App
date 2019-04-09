const { db } = require('../database/index.js');

const correctFormat = (str) => {
  let newStr = str;
  for (let n = 0; n < newStr.length; n++) {
    if(newStr[n] ===`'`) {
      let temp = newStr.slice(0,n) + `'` + newStr.slice(n)
      newStr = temp
      n++
    }
  }
  return newStr;
}

const controller = {
  
  newTag: (req, res) => {
    let newTag = req.body.tag
    db.query(`INSERT INTO tags(tag) VALUES('${correctFormat(newTag)}') RETURNING *`)
      .then((dbRes) => {
        res.status(200).send(dbRes)
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  },

  getTags: (req, res) => {
    db.query('SELECT * FROM tags')
    .then((tags) => {
      res.status(200).send(tags)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    })
  },

  newCategory: (req, res) => {
    let newCategory = req.body.category
    db.query(`INSERT INTO categories(category) VALUES('${correctFormat(newCategory)}') RETURNING *`)
      .then((dbRes) => {
        res.status(200).send(dbRes)
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  },

  getCategories: (req, res) => {
    db.query('SELECT * FROM categories')
      .then ((categories) => {
        res.status(200).send(categories);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      })
  },

    newIngredient: (req, res) => {
      let newIngredient = req.body
      db.query(`INSERT INTO ingredients(ingredient) VALUES('${correctFormat(newIngredient.ingredient)}') RETURNING *`)
        .then((dbRes) => {
          let imgNum = dbRes.rows[0].ingredient_id
          db.query(`INSERT INTO images(ingredient, url, alt_tag, height, width) VALUES(${imgNum}, '${correctFormat(newIngredient.url)}', '${correctFormat(newIngredient.altTag)}', ${newIngredient.height}, ${newIngredient.width})`)
            .then((imgRes) => {
              let output = {ingredientResponse: dbRes, imageResponse: imgRes}
              res.status(200).send(output);
            })
            .catch((err) => {
              console.log(err);
              res.status(400).send(err);
            })
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        });
    },
  
    getIngredients: (req, res) => {
      db.query('SELECT * FROM ingredients')
        .then ((ingredients) => {
          res.status(200).send(ingredients);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        })
    },

    newRecipe: (req, res) => {
      let data = req.body;

      db.query(`INSERT INTO recipes(title, category, tagline, heat, yield, difficulty, prep_time, custom) 
      VALUES('${correctFormat(data.recipeName)}', ${data.category}, '${correctFormat(data.tagLine)}', ${data.heat}, ${data.yield}, ${data.difficulty}, ${data.prepTime}, '${correctFormat(data.html)}') RETURNING *`)
        .then((recipeRes) => {
          let recipeNum = recipeRes.rows[0].recipe_id;
          let imagesValues = ''
          for (let i = 0; i < data.recipeImages.length; i++) {
            let image = data.recipeImages[i];
            let temp = `(${recipeNum}, '${correctFormat(image.url)}', '${correctFormat(image.altTag)}', ${image.height}, ${image.width}, ${i === 0 ? 1 : 2}, ${i === 0 ? null : i}),`
            imagesValues += temp;
          }
          imagesValues = imagesValues.slice(0, -1)
          db.query(`INSERT INTO images(recipe, url, alt_tag, height, width, type, position) VALUES${imagesValues}`)
            .then((imgRes) => {
              console.log(`recipe images added successfully`)
            })
            .catch((err) => {
              console.log('error in images entry: ',err);
            })
          let instructionsValues = ''
          for (let i = 0; i < data.instructions.length; i++) {
            let instruction = data.instructions[i];
            let temp = `(${i + 1}, '${correctFormat(instruction)}', ${recipeNum}),`
            instructionsValues += temp;
          }
          instructionsValues = instructionsValues.slice(0, -1)
          db.query(`INSERT INTO instructions(step_number, text, recipe) VALUES${instructionsValues}`)
            .then((instructionsRes) => {
              console.log('recipe instructions added successfully');
            })
            .catch((err) => {
              console.log('error in instructions entry: ', err);
            })
          let ingredValues = '';
          for (let i = 0; i < data.ingredientsText.length; i++) {
            let ingredient = data.ingredientsText[i];
            let temp = `('${correctFormat(ingredient)}', ${recipeNum}),`
            ingredValues += temp;
          }
          ingredValues = ingredValues.slice(0, -1);
          db.query(`INSERT INTO ingredients_strings(text, recipe) VALUES${ingredValues}`)
            .then((ingredStrRes) => {
              console.log('ingredients strings added successfully');
            })
            .catch((err) => {
              console.log('error in ingredientsStr entry: ',err);
            })
          let tagValues = '';
          for (let i = 0; i < data.tags.length; i++) {
            let tag = data.tags[i];
            let temp = `(${recipeNum}, ${tag.tag_id}),`
            tagValues += temp;
          }
          tagValues = tagValues.slice(0, -1);
          db.query(`INSERT INTO tags_recipe_join (recipe, tag) VALUES${tagValues}`)
            .then((tagRecJoinRes) => {
              console.log('tag recipe joins added successfully');
            })
            .catch((err) => {
              console.log('error in tags_recipe join entry: ',err);
            })
            let ingIdValues = '';
            for (let i = 0; i < data.ingredients.length; i++) {
              let ingredient = data.ingredients[i];
              let temp = `(${recipeNum}, ${ingredient.ingredient_id}),`
              ingIdValues += temp;
            }
            ingIdValues = ingIdValues.slice(0, -1);
            db.query(`INSERT INTO ingredients_recipes_join (recipe, ingredient) VALUES${ingIdValues}`)
              .then((ingRecJoinRes) => {
                console.log('ingredients recipe joins added successfully');
              })
              .catch((err) => {
                console.log('error in ingred_recipe join entry: ',err);
              })
          res.status(200).send(recipeRes)
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send(err)
        })
    },

    getRecipes: (req, res) => {
      db.query('SELECT * FROM recipes')
        .then((recipes) => {
          res.status(200).send(recipes);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        })
    }
}

module.exports = controller;