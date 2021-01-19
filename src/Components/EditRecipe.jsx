import React from 'react';
import PropTypes from 'prop-types';
import { RecipeForm } from './RecipeForm';

export function EditRecipe ({ ingredients, onSubmit, recipe }) {
    
    return <RecipeForm ingredients={ingredients} recipe={recipe} onSubmit={onSubmit} button="Editer"/>
}

EditRecipe.propTypes = {
    recipe: PropTypes.object.isRequired,
    ingredients: PropTypes.array
}