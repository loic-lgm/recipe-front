import { useReducer } from "react"
import { apiFetch } from "../utils/api"

function reducer (state, action) {
    console.log('INGREDIENTS', action.type, action)
    switch (action.type) {
        case 'FETCHING_INGREDIENTS':
            return {...state, loading: true}
        case 'SET_INGREDIENTS':
            return {...state, ingredients: action.payload, loagind: false}
        case 'ADD_INGREDIENT':
            return {...state, ingredients: [...state.ingredients, action.payload]}
        case 'UPDATE_INGREDIENT':
            return {...state, ingredients: state.ingredients.map(i => i === action.target ? action.payload : i)}
        case 'DELETE_INGREDIENT':
            return { ...state, ingredients: state.ingredients.filter(i => i !== action.payload) }
            default:
                console.log(`Sorry, we are out of ${action.type}.`);    
    }
}

export function useIngredients () {
    const [state, dispatch] = useReducer(reducer, {
        ingredients: null,
        loading: false
    })

    return {
        ingredients: state.ingredients, 
        // possibilité d'ajouter un try/catch pour capture les éventuelles erreurs
        fetchIngredients: async function () {
            // pas de render si loading & ingredients sont déjà chargés 
            if (state.loading || state.ingredients) {
                return;
            }
            dispatch({type: 'FETCHING_INGREDIENTS'})
            const ingredients = await apiFetch('/ingredients')
            dispatch({type: 'SET_INGREDIENTS', payload: ingredients})
        },
        deleteIngredient: async function (ingredient) {
            await apiFetch('/ingredients/' + ingredient.id, {
                // passer à 'DELETE' pour persister en DB
                method: 'GET'
            })
            dispatch({type: 'DELETE_INGREDIENT', payload: ingredient})
        }
    }
}