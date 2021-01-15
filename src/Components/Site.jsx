import React, { useEffect, useState } from 'react';
import { useIngredients } from '../hooks/ingredients';
import { useRecipes } from '../hooks/recipes';
import { Ingredients } from './Ingredients';
import { RecipeDetail } from './RecipeDetail';
import { Recipes } from './Recipes';

function NavBar ({currentPage, onClick }) {
    // définit une classe pour la page est active
    const navClass = function (page) {
        let className = ''
        if (page === currentPage) {
            className = 'active'
        }
        return className
    }

    return <nav>
        <a href="#accueil">Nom du site</a>
        <ul>
            <li className={navClass('recettes')} onClick={() => onClick('recettes')}>
                <a href="#recettes">Recettes</a>
            </li>
            <li className={navClass('ingredients')} onClick={() => onClick('ingredients')}>
                <a href="#ingredients">Ingrédients</a>
            </li>
        </ul>
    </nav>
}

export function Site () {
    // état qui permet de savoir sur quelle page on est
    const [page, setPage] = useState('recettes')

    const {
        ingredients,
        fetchIngredients,
        addIngredient,
        updateIngredient,
        deleteIngredient
    } = useIngredients()

    const {
        recipes,
        recipe,
        fetchRecipes,
        fetchRecipe,
        deselectRecipe
    } = useRecipes()

    let content = null
    if (page === 'ingredients') {
        content = <Ingredients 
            ingredients={ingredients} 
            onDelete={deleteIngredient}
            onUpdate={updateIngredient}
            onCreate={addIngredient}
        />
    } else if (page === 'recettes') {
        content = <Recipes
            recipes={recipes}
            onClick={fetchRecipe}
        />
    }

    useEffect(function() {
        if (page === 'ingredients') {
            fetchIngredients()
        } else if (page === 'recettes') {
            fetchRecipes()
        }
    }, [page, fetchIngredients, fetchRecipes])

    return <>
        <NavBar currentPage={page} onClick={setPage}/>
        {recipe ? <RecipeDetail recipe={recipe} onClose={deselectRecipe}/> : null}
        {content}
    </>
}