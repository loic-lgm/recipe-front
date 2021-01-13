import React, { useEffect, useState } from 'react';
import { useIngredients } from '../hooks/ingredients';
import { Ingredients } from './Ingredients';

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
    const [page, setPage] = useState('ingredients')

    const {
        ingredients,
        fetchIngredients,
        deleteIngredient
    } = useIngredients()

    let content = null
    if (page === 'ingredients') {
        content = <Ingredients ingredients={ingredients} onDelete={deleteIngredient}/>
    }

    useEffect(function() {
        if (page === 'ingredients') {
            fetchIngredients()
        }
    }, [page])

    return <>
        <NavBar currentPage={page} onClick={setPage}/>
        {content}
    </>
}