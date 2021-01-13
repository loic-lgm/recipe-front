import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../ui/Loader';
import { Button } from '../ui/Button';

function Ingredient ({ingredient, onDelete}) {
    const [loading, setLoading] = useState(false)

    const handleDelete = async function (e) {
        e.preventDefault()
        setLoading(true)
        await onDelete(ingredient)
        setLoading(false)
    }

    return <li>
        {ingredient.title}
        <Button onClick={handleDelete} loading={loading}>Supprimer</Button>
    </li>
}

function IngregientList ({ingredients, onDelete}) {
    return <ul>
        {ingredients.map(ingredient => <Ingredient key={ingredient.id} ingredient={ingredient} onDelete={onDelete}/>)}
    </ul>
}

export function Ingredients ({ingredients, onDelete}) {

    return  <div>
        <h1>Ingrédients</h1>
        {ingredients === null ? <Loader /> : <IngregientList ingredients={ingredients} onDelete={onDelete}/>}
        {/* {JSON.stringify(ingredients)} */}
    </div>
}

Ingredients.propTypes = {
    ingredients: PropTypes.array
}