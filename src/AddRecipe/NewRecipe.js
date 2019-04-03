import React, { Component } from 'react';
import styles from './NewRecipe.module.css';
import Categories from './Categories.js';
import Tags from './Tags.js';
import AddCategory from './AddCategory.js';
import AddTag from './AddTag.js'
import Ingredients from './Ingredients.js';
import AddIngredient from './AddIngredient.js';
import AddRecipeImage from './AddRecipeImage.js';

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      tagLine: '',
      recipeImages: [],
      availableIngredients: ['carrots', 'celery', 'nick\'s jizz'],
      availableCategories: ['Select Category','cat1', 'cat2', 'cat3'],
      availableTags: ['tag1', 'tag2', 'tag3'],
      category: '',
      tags: [],
      ingredients: [],
      newTag: '',
      heat: '1',
      yield: '',
      difficulty: '1',
      prepTime: '',
      html: '',
    }
    this.titleChange = this.titleChange.bind(this);
    this.tagLineChange = this.tagLineChange.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
    this.heatChange = this.heatChange.bind(this);
    this.yieldChange = this.yieldChange.bind(this);
    this.difficultyChange = this.difficultyChange.bind(this);
    this.prepTimeChange = this.prepTimeChange.bind(this);
    this.selectTag = this.selectTag.bind(this);
    this.selectIngredient = this.selectIngredient.bind(this);
    this.addImage = this.addImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //server request to populate available categories and available tags.
  }
  
  titleChange(e) {
    this.setState({recipeName: e.target.value});
  }

  tagLineChange(e) {
    this.setState({tagLine: e.target.value});
  }

  categoryChange(e) {
    this.setState({category: e.target.value})
  }

  heatChange(e) {
    this.setState({heat: e.target.value})
  }

  yieldChange(e) {
    this.setState({yield: e.target.value})
  }

  difficultyChange(e) {
    this.setState({difficulty: e.target.value})
  }

  prepTimeChange(e) {
    this.setState({prepTime: e.target.value})
  }

  htmlChange(e) {
    this.setState({html: e.target.value})
  }

  selectTag(e) {
    let arr = this.state.tags.slice();
    let check = false;
    let index
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === e.target.value) {
        check = true;
        index = i
        break;
      }
    }
    if (check) {
      arr.splice(index, 1);
    } else {
      arr.push(e.target.value);
    }
    this.setState({
      tags: arr
    });
  }

  selectIngredient(e) {
    let arr = this.state.ingredients.slice();
    let check = false;
    let index
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === e.target.value) {
        check = true;
        index = i
        break;
      }
    }
    if (check) {
      arr.splice(index, 1);
    } else {
      arr.push(e.target.value);
    }
    this.setState({
      ingredients: arr
    });
  }

  addImage(obj) {
    console.log('this is obj: ', obj)
    let arr = this.state.recipeImages.concat([obj]);
    this.setState({recipeImages: arr}, console.log('this is recipeImage arr: ', this.state.recipeImages))
  }

  handleSubmit(e) {
    console.log(this.state);
    e.preventDefault();
  }

  render() {
    return (
      <div className={styles.formsWrapper}>
        <form className={styles.createRecipeForm} onSubmit={this.handleSubmit}>
          <h2>Add a New Recipe</h2>
          <div className={styles.createRecipeFormSection}>
          {this.state.recipeImages.map((image, i) => {
            return <img key = {i} src = {image.url} alt = {image.alt}/>
          })}
            <label>Recipe Title:</label>
            <input type="text" value={this.state.recipeName} onChange={this.titleChange} />
          </div>
          <div className={styles.createRecipeFormSection}>
            <label>Recipe Tagline:</label>
            <input type="text" value={this.state.tagLine} onChange={this.tagLineChange} />
          </div>
          <Ingredients availableIngredients = {this.state.availableIngredients} selectIngredient = {this.selectIngredient}/>
          <Categories categories = {this.state.availableCategories} category = {this.state.category} categoryChange = {this.categoryChange}/>
          <Tags availableTags = {this.state.availableTags} selectTag = {this.selectTag}/>
          <div className={styles.createRecipeFormSection}>
            <label>Recipe Heat:</label>
            <select onChange = {this.heatChange}>
              <option value = '1'>1</option>
              <option value = '2'>2</option>
              <option value = '3'>3</option>
              <option value = '4'>4</option>
              <option value = '5'>5</option>
              <option value = '6'>6</option>
              <option value = '7'>7</option>
              <option value = '8'>8</option>
              <option value = '9'>9</option>
              <option value = '10'>10</option>
            </select>
          </div>
          <div className={styles.createRecipeFormSection}>
            <label>Recipe Yield (in cups):</label>
            <input type="number" value={this.state.yield} onChange={this.yieldChange} />
          </div>
          <div className={styles.createRecipeFormSection}>
            <label>Recipe Difficulty:</label>
            <select onChange = {this.difficultyChange}>
              <option value = '1'>1</option>
              <option value = '2'>2</option>
              <option value = '3'>3</option>
              <option value = '4'>4</option>
              <option value = '5'>5</option>
              <option value = '6'>6</option>
              <option value = '7'>7</option>
              <option value = '8'>8</option>
              <option value = '9'>9</option>
              <option value = '10'>10</option>
            </select>
          </div>
          <div className={styles.createRecipeFormSection}>
            <label>Recipe Preparation Time (in minutes):</label>
            <input type="number" value={this.state.prepTime} onChange={this.prepTimeChange} />
          </div>
          <div className={styles.createRecipeFormSection}>
            <label>Add HTML for Custom Area:</label>
            <textarea type="text" value={this.state.html} onChange={this.htmlChange} />
          </div>
          <input type="submit" value="Submit" />
        </form>
        <AddRecipeImage addImage = {this.addImage}/>
        <AddIngredient/>
        <AddCategory/>
        <AddTag/>
      </div>
      
    );
  }
}

export default NewRecipe;
