import { useCallback, useReducer } from "react"
import { apiFetch } from "../utils/api"

function reducer (state, action) {
    console.log('RECIPES', action.type, action)
    switch (action.type) {
        case 'FETCHING_RECIPES':
            return {...state, loading: true}
        case 'SET_RECIPES':
            return {...state, recipes: action.payload, loading: false}
        case 'FETCHING_RECIPE':
            return {...state, recipeId: action.payload.id, loading: true}
        case 'SET_RECIPE':
            return {...state, recipes: state.recipes.map(recipe => recipe.id === action.payload.id ? action.payload : recipe), loading: false}       
        case 'ADD_RECIPE':
            return {...state, recipes: [action.payload, ...state.recipes]}
        case 'DESELECT_RECIPE':
            return {...state, recipeId: null}       
        default:
            console.log(`Sorry, we are out of ${action.type}.`)
            throw new Error('Action inconnue' + action.type)     
    }
}

export function useRecipes () {
    const [state, dispatch] = useReducer(reducer, {
        recipes: null,
        loading: false,
        recipeId: null
    })

    const currentRecipe = state.recipes ? state.recipes.find(recipe => recipe.id === state.recipeId) : null

    return {
        recipes: state.recipes,
        recipe: currentRecipe,
        fetchRecipes: async function () {
            // pas de render si loading & recipes sont déjà chargés 
            if (state.loading || state.recipes) {
                return;
            }
            dispatch({type: 'FETCHING_RECIPES'})
            const recipes = await apiFetch('/recipes')
            dispatch({type: 'SET_RECIPES', payload: recipes})
        },
        fetchRecipe: useCallback(async function (recipe) {
            dispatch({type: 'FETCHING_RECIPE', payload: recipe})
            if (!recipe.ingredients) { 
                recipe = await apiFetch('/recipes/' + recipe.id)
                dispatch({type: 'SET_RECIPE', payload: recipe})
            }
        }, []),
        createRecipe: useCallback(async function (data) {
            const recipe = await apiFetch('/recipes', {
                method: 'POST',
                body: data
            })
            dispatch({type: 'ADD_RECIPE', payload: recipe})
        }, []),
        deselectRecipe: function () {
            dispatch({type: 'DESELECT_RECIPE'})
        }
    }
}