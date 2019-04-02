import React, { Component } from 'react';
import styles from './App.module.css';
import Recipe from './Recipe.js';
import Header from './Header.js';
import NewRecipe from './AddRecipe/NewRecipe.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      PageType: 'Recipe',
    }
    this.displayRecipe = this.displayRecipe.bind(this);
  }
  displayRecipe() {
    if (this.state.PageType === 'Recipe') {
      this.setState({
        PageType: 'Nothing'
      })
    } else {
      this.setState({
        PageType: 'Recipe'
      })
    }
  }
  render() {
    return (
      
      <div className={styles.App}>
        <Header currentPage = {this.state.PageType}/>
        <button onClick = {this.displayRecipe}>showRecipe</button>
        {this.state.PageType === 'Recipe' ? <Recipe/> : null}
        {this.state.PageType === 'Nothing' ? <p>fuck nick</p> : null}
        <NewRecipe/>
      </div>
    );
  }
}

export default App;
