import React from 'react';
import { RecipeForm } from './RecipeForm';

export function CreateRecipe ({ ingredients, onSubmit }) {
    return <RecipeForm ingredients={ingredients} onSubmit={onSubmit} button="Ajouter"/>
}