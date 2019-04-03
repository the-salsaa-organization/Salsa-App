import React, {Component} from 'react';
import styles from './NewRecipe.module.css';

class AddTag extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.changeTag = this.changeTag.bind(this);
    this.submitTag = this.submitTag.bind(this);
  }

  changeTag(e) {
    this.setState({value: e.target.value});
  }

  submitTag(e) {
    //access database then refresh tags on NewRecipe.js
    e.preventDefault();
  }

  render() {
    return (
      <form className={styles.createTagForm} onSubmit={this.submitTag}>
        <label>Create New Tag:</label>
          <input type="text" value={this.state.value} onChange={this.changeTag} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default AddTag;