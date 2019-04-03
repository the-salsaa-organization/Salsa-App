import React from 'react';
import styles from './NewRecipe.module.css';

const Tags = (props) => {
    return (
      <div className={styles.createRecipeFormSection}>
        <label>Select Existing Tags:</label>
        <div className={styles.checkboxGroup}>
          {props.availableTags.map((tag, i) => {
            return <div key = {i} className={styles.checkbox}><input id = {`tagCheckBox${i}`} type = 'checkbox' value = {tag} onChange = {props.selectTag}/><label htmlFor = {`tagCheckBox${i}`}>{tag}</label></div>
          })}
        </div>
      </div>
    );
}

export default Tags;