import React, { Component } from 'react';
import styles from './Recipe.module.css';

class Recipe extends Component {
  constructor() {
    super();
    this.state = {
      currentRecipe: 'Monkey Spunk'
    }
  }
  render() {
    return (
      <div className={styles.Recipe}>
        {this.state.currentRecipe}
      </div>
    );
  }
}

export default Recipe;
