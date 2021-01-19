import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../ui/Loader';
import { Button } from '../ui/Button';

export function Recipes ({ recipes, onClick  }) {
    if (recipes === null) {
        return <Loader />
    }
    return <div>
        <h1>Recettes</h1>
        {recipes.map(recipe => <div key={recipe.id}>
            <Recipe recipe={recipe} onClick={onClick}/>
        </div>)}
    </div>
}

const Recipe = memo(function ({ recipe, onClick }) {

    return <div>
        <h3>{recipe.title}</h3>
        <p>{recipe.short}</p>
        <Button onClick={() => onClick(recipe)}>Voir plus</Button>
    </div>
})

Recipes.propTypes = {
    recipes: PropTypes.array,
    onClick: PropTypes.func.isRequired
}