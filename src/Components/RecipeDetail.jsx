import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../ui/Loader';
import { Modal } from '../ui/Modal';

export function RecipeDetail ({ recipe, onClose }) {
    return <Modal title={recipe.title} onClose={onClose}>
            {recipe.content ? <RecipeDetails recipe={recipe}/> : <Loader/>}
    </Modal>
}

const RecipeDetails = memo(function ({recipe}) {
    // ajoute une balise br à chaque fin de ligne 
    const htmlContent = {__html: recipe.content.split("\n").join('<br/>')}
    return <>
        <div dangerouslySetInnerHTML={htmlContent}></div>
        <h4 className="mt-4">Ingrédients :</h4>
        <ul>
            {recipe.ingredients.map(i => <IngredientRow ingredient={i} key={i.id}/>)}
        </ul>
    </>
})

function IngredientRow ({ ingredient }) {
    return <li>
        <strong>{ingredient.quantity} {ingredient.unit} </strong>{ingredient.title}
    </li>
}

RecipeDetail.propTypes = {
    recipe: PropTypes.object.isRequired
}