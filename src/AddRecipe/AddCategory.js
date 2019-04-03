import React, {Component} from 'react';
import styles from './NewRecipe.module.css';

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.changeCategory = this.changeCategory.bind(this);
    this.submitCategory = this.submitCategory.bind(this);
  }

  changeCategory(e) {
    this.setState({value: e.target.value});
  }

  submitCategory(e) {
    //access database and refresh NewRecipe page
    e.preventDefault();
  }

  render() {
    return (
    <form className={styles.createCategoryForm} onSubmit={this.submitCategory}>
        <label>Create New Category:</label>
        <input type="text" value={this.state.value} onChange={this.changeCategory} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default AddCategory;