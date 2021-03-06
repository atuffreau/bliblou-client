import React from "react";
import { bool, string, array, func } from "prop-types";

import CardList from "../../../components/presentation/CardList";

import AddRecipeCard from "./AddRecipeCard";
import RecipeCard from "./RecipeCard";

const RecipesList = ({ title, canAdd, catalog, predicate, loadPicture, openRecipe }) => {
  const recipes = catalog.filter(predicate);
  return recipes.length !== 0 || canAdd 
    ? (
      <CardList title={ title }>
        { canAdd ? <AddRecipeCard /> : <></> }
        { recipes.map(({ recipeId, content, picture, thumbnails }, index) => ( 
          <RecipeCard key={ `${recipeId}${index}` }
                      recipeId={ recipeId } 
                      content={ content } 
                      picture={ picture } 
                      thumbnails={ thumbnails }
                      loadPicture={ loadPicture }
                      onCardClick={ openRecipe } />
        )) }
      </CardList>
    )
    : <></>; 
};

RecipesList.propTypes = {
  title: string.isRequired,
  canAdd: bool,
  catalog: array,
  predicate: func, 
  loadPicture: func.isRequired,
  openRecipe: func
};

RecipesList.defaultProps = {
  canAdd: false,
  catalog: [],
  predicate: () => true,
  openRecipe: () => {}
};

export default RecipesList;