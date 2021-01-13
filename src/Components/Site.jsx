import React, { useState } from 'react';

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
        <a href="#">Nom du site</a>
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

    return <>
        <NavBar currentPage={page} onClick={setPage}/>
        <p>{page}</p>
    </>
}