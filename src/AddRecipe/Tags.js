import React, { Component } from 'react';
import styles from './NewRecipe.module.css';

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  render() {
    return (
      <div className={styles.createRecipeFormSection}>
        <label>Select an Existing Tag:</label>
        <div>
          {this.props.availableTags.map((tag, i) => {
            return <div key = {i}><input id = {`tagCheckBox${i}`} type = 'checkbox' value = {tag} onChange = {this.props.selectTag}/><label htmlFor = {`tagCheckBox${i}`}>{tag}</label></div>
          })}
        </div>
      </div>
    );
  }
}

export default Tags;