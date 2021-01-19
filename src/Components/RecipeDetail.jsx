import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../ui/Loader';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Trash } from '../ui/Icon';
import { useToggle } from '../hooks';
import { EditRecipe } from './EditRecipe';

export function RecipeDetail ({ recipe, onClose, onEdit, ingredients, onUpdate, onDelete }) {
    return <Modal title={recipe.title} onClose={onClose}>
        {recipe.ingredients ? <RecipeDetails 
            recipe={recipe} 
            onEdit={onEdit} 
            onUpdate={onUpdate}
            ingredients={ingredients}
        /> : <Loader/>}
        <Button type="danger" onClick={() => onDelete(recipe)}><Trash /></Button>
    </Modal>
}

const RecipeDetails = memo(function ({ recipe, ingredients, onEdit, onUpdate }) {
    // permet de savoir si on est en edit mode
    const [editMode, toggleEditMode] = useToggle(false)
    // ajoute une balise br à chaque fin de ligne 
    const htmlContent = {__html: recipe.content.split("\n").join('<br/>')}

    const handleEditMode = function () {
        toggleEditMode()
        onEdit()
    }

    const handleUpdate = function () {
        toggleEditMode()
        onEdit()
    }

    return editMode ? <EditRecipe 
        recipe={recipe} 
        ingredients={ingredients}
        onSubmit={handleUpdate}
    /> : <>
        <div dangerouslySetInnerHTML={htmlContent}></div>
        <h4 className="mt-4">Ingrédients :</h4>
        <ul>
            {recipe.ingredients.map(i => <IngredientRow ingredient={i} key={i.id}/>)}
        </ul>
        <Button onClick={handleEditMode}>Edit</Button>
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