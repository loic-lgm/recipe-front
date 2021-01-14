import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../ui/Loader';
import { Button } from '../ui/Button';
import { ApiErrors } from '../utils/api';
import { Field } from '../ui/Field';

function CreateIngredientForm ({onSubmit}) {
    const [loading, setLoading] = useState(false)
    // état qui mémorise les erreurs
    const [errors, setErrors] = useState([])

    const handleSubmit = async function (e) {
        e.preventDefault()
        // save le form quand on utiliser async func
        const form = e.target
        setErrors([])
        setLoading(true)
        try {
            await onSubmit(new FormData(form ))
            form.reset()
            form.querySelector('input').focus()
        } catch (e) {
            if (e instanceof ApiErrors) {
                setErrors(e.errors)
            } else {
                throw e
            }
        }
        setLoading(false)
    }

    const errorFor = function (field) {
        const error = errors.find(e => e.field === field)
        if (error) {
            return error.message
        }
        return null
    }

    return <form onSubmit={handleSubmit}>
        <Field placeholder="Nom de l'ingrédient" name="title" error={errorFor('title')}/>
        <Field placeholder="Unité de mesure" name="unit" error={errorFor('unit')}/>
        <Button type="submit" loading={loading}>Ajouter</Button>
    </form>
}

const Ingredient = memo(function ({ingredient, onDelete, onUpdate}) {
    const [loading, setLoading] = useState(false)
    // état qui mémorise les erreurs
    const [errors, setErrors] = useState([])

    const handleDelete = async function (e) {
        e.preventDefault()
        setLoading(true)
        await onDelete(ingredient)
        setLoading(false)
    }

    const handleSubmit = async function (e) {
        e.preventDefault()
        setErrors([])
        setLoading(true)
        try {
            await onUpdate(ingredient, new FormData(e.target))
        } catch (e) {
            if (e instanceof ApiErrors) {
                setErrors(e.errors)
            } else {
                throw e
            }
        }
        setLoading(false)
    }

    const errorFor = function (field) {
        const error = errors.find(e => e.field === field)
        if (error) {
            return error.message
        }
        return null
    }

    return <form onSubmit={handleSubmit}>
        <Field defaultValue={ingredient.title} name="title" error={errorFor('title')}/>
        <Field defaultValue={ingredient.unit} name="unit" error={errorFor('unit')}/>
        <Button type="submit" loading={loading}>Mettre à jour</Button>
        <Button onClick={handleDelete} loading={loading}>Supprimer</Button>
    </form>
})

function IngregientList ({ingredients, onDelete, onUpdate}) {
    return <div>
        {ingredients.map(ingredient => <Ingredient key={ingredient.id} ingredient={ingredient} onDelete={onDelete} onUpdate={onUpdate}/>)}
    </div>
}

export function Ingredients ({ingredients, onDelete, onUpdate, onCreate}) {

    return  <div>
        <h1>Ingrédients</h1>
        <CreateIngredientForm onSubmit={onCreate}/>
        {ingredients === null ? <Loader /> : <IngregientList ingredients={ingredients} onDelete={onDelete} onUpdate={onUpdate}/>}
        {/* {JSON.stringify(ingredients)} */}
    </div>
}

Ingredients.propTypes = {
    ingredients: PropTypes.array
}