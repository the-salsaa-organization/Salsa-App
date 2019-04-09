import React from 'react';
// import { withRouter } from "react-router-dom";


const Recipe = (props) => {
  console.log('location from Recipe: ', props.location);
  return <div>this is recipe: {props.match.params.recipeTitle}</div>
}

export default Recipe;