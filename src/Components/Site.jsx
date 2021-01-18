import React, { useEffect, useState } from 'react';
import { useToggle } from '../hooks';
import { useIngredients } from '../hooks/ingredients';
import { useRecipes } from '../hooks/recipes';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { CreateRecipe } from './CreateRecipe';
import { Ingredients } from './Ingredients';
import { RecipeDetail } from './RecipeDetail';
import { Recipes } from './Recipes';

function NavBar ({currentPage, onClick, onButtonClick }) {
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
        <Button onClick={onButtonClick}>Ajouter</Button>
    </nav>
}

export function Site () {
    // état qui permet de savoir sur quelle page on est
    const [page, setPage] = useState('recettes')
    // état qui permet de savoir si on affiche la modal addRecipe
    const [add, toggleAdd] = useToggle(false)

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
        createRecipe,
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
        if (page === 'ingredients' || add) {
            fetchIngredients()
        } else if (page === 'recettes') {
            fetchRecipes()
        } 
    }, [page, fetchIngredients, fetchRecipes, add])

    return <>
        <NavBar currentPage={page} onClick={setPage} onButtonClick={toggleAdd}/>
        {recipe ? <RecipeDetail recipe={recipe} onClose={deselectRecipe}/> : null}
        {add && <Modal title="Créer une recette" onClose={toggleAdd}>
            <CreateRecipe ingredients={ingredients} onSubmit={createRecipe}/>
        </Modal>}
        {content}

    </>
}