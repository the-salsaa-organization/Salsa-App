import React, { Component } from 'react';
// import styles from './NewRecipe.module.css';

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      tagLine: '',
      availableCategories: [],
      category: '',
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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    console.log(this.state);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          Recipe Title:
          <input type="text" value={this.state.recipeName} onChange={this.titleChange} />
        </div>
        <div>
          Recipe Tagline:
          <input type="text" value={this.state.tagLine} onChange={this.tagLineChange} />
        </div>
        <div>
          Recipe Category:
          <input type="text" value={this.state.category} onChange={this.categoryChange} />
        </div>
        <div>
          Recipe Heat:
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
        <div>
          Recipe Yield (in cups):
          <input type="number" value={this.state.yield} onChange={this.yieldChange} />
        </div>
        <div>
          Recipe Difficulty:
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
        <div>
          Recipe Preparation Time (in minutes):
          <input type="number" value={this.state.prepTime} onChange={this.prepTimeChange} />
        </div>
        <div>
          Add HTML for Custom Area:
          <div>
            <textarea type="text" value={this.state.html} onChange={this.htmlChange} />
          </div>
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NewRecipe;
