const { db } = require('../database/index.js');

const controller = {
  
  newTag: (req, res) => {
    let newTag = req.body.tag
    db.query(`INSERT INTO tags(tag) VALUES('${newTag}') RETURNING *`)
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
    db.query(`INSERT INTO categories(category) VALUES('${newCategory}') RETURNING *`)
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
      db.query(`INSERT INTO ingredients(ingredient) VALUES('${newIngredient.ingredient}') RETURNING *`)
        .then((dbRes) => {
          let imgNum = dbRes.rows[0].ingredient_id
          db.query(`INSERT INTO images(ingredient, url, alt_tag, height, width) VALUES(${imgNum}, '${newIngredient.url}', '${newIngredient.altTag}', ${newIngredient.height}, ${newIngredient.width})`)
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
}

module.exports = controller;