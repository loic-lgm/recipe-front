import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from '../ui/Field';
import { Loader } from '../ui/Loader';
import { Button } from '../ui/Button';
import { ApiErrors } from '../utils/api';

export function RecipeForm ({ ingredients, onSubmit, recipe = {}, button }) {
    const {
        ingredients: recipeIngredients,
        addIngredient, 
        updateQuantity,
        resetIngredients,
        deleteIngredient
    } = useIngredients(recipe.ingredients)

    const [errors, setErrors] = useState({})

    const filteredIngredients = (ingredients || []).filter(ingredient => {
        return !recipeIngredients.some(i => i.id === ingredient.id)
    })

    const handleSubmit = async function (e) {
        e.preventDefault()
        const form = e.target
        // convertir les données du form pour les envoyer à l'api
        const data = Object.fromEntries(new FormData(form))
        // ajoute une nouvelle clée ingredients à data
        data.ingredients = recipeIngredients
        setErrors({})
        try {
            await onSubmit(data)
            form.reset()
            resetIngredients()
        } catch (e) {
           if (e instanceof ApiErrors) {
                setErrors(e.errorsPerField)
           } else {
               throw e
           }
        }
    }

    return <form onSubmit={handleSubmit}> 
        <div>
            <Field name="title" error={errors.title} defaultValue={recipe.title} required>Titre</Field>
        </div>
        <div>
            <Field name="short" error={errors.short} defaultValue={recipe.short} type="textarea" required>Description courte</Field>
        </div>
        <div>
            <Field name="content" error={errors.content} defaultValue={recipe.content}  type="textarea" required>Description</Field>
        </div>
        <div>
            <h5>Ingrédients</h5>
            {recipeIngredients.map(i => <IngredientRow ingredient={i} key={i.id} onChange={updateQuantity} onDelete={deleteIngredient}/>)}
            {ingredients ? <Select ingredients={filteredIngredients} onChange={addIngredient}/> : <Loader />}
        </div>
        <Button type="submit">{button}</Button>
    </form>
}

// ==! hooks/ingredients.js
function useIngredients (init) {
    const [ingredients, setIngredients] = useState(init || [])

    return {
        ingredients: ingredients,
        // utilisation de useCallback pour que les fonctions de mutations ne changent pas et ne soient pas re-appélées
        addIngredient: useCallback(function (ingredient) {
            setIngredients(state => [...state, {...ingredient, quantity: ''}])
        }, []),
        updateQuantity: useCallback(function (ingredient, quantity) {
            setIngredients(state => state.map(element => element === ingredient ? {...element, quantity} : element))
        }, []),
        resetIngredients: useCallback(function () {
            setIngredients([])
        }, []), 
        deleteIngredient: useCallback(function (ingredient) {
            setIngredients(state => state.filter(i => i !== ingredient))
        }, [])
    } 
}

function IngredientRow ({ ingredient, onChange, onDelete }) {
    const handleChange = function (e) {
        onChange(ingredient, e.target.value)
    }

    return <div>
            {ingredient.title}
            <Field defaultValue={ingredient.quantity} placeholder="quantité" onChange={handleChange} required type="number"/>
            {ingredient.unit}
            <Button onClick={() => onDelete(ingredient)}>Supprimer</Button>
        </div>
}

function Select ({ingredients, onChange}) {
    const handleChange = function (e) {
        // e.target.value = la clée dans le tableau des ingrédients
        onChange(ingredients[parseInt(e.target.value, 10)])
    }

    return <select name="" id="" onChange={handleChange}>
        <option value="">Selectionner un ingrédient</option>
        {ingredients.map((i, key) => <option key={i.id} value={key}>{i.title}</option>)}
    </select>
}

RecipeForm.propTypes = {
    ingredients: PropTypes.array
}