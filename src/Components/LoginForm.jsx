import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { apiErrors, apiFetch } from '../utils/api';

function Alert ({message}) {
    return <div>
        {message}
    </div>
}

export function LoginForm ({onConnect}) {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async function (e) {
        e.preventDefault()
        setError(null)
        setLoading(false)
    
        // récupére les données du form
        const data = new FormData(e.target)
    
        // appel à l'api
        const user = await apiFetch('/login', {
            method: 'POST',
            body: data,
        })
        try {
            // si la réponse est OK, on passe les data
            onConnect(user)
        } catch (e) {
            if (e instanceof apiErrors) {
                setError(e.errors[0].message)
            } else {
                console.error(e)
            }
            setLoading(false)
        }
    }

     return <form onSubmit={handleSubmit}>
         <h2>Se connecter</h2>
         {error && <Alert message={error}/>}
         <label htmlFor="email">Nom d'utilisateur</label>
         <input type="text" name="email" id="email" required/>
         <label htmlFor="password">Mot de passe</label>
         <input type="password" name="password" id="password" required/>
         <button type="submit" disabled={loading}>Se connecter</button>
     </form>
}

LoginForm.propTypes = {
    onConnect: PropTypes.func.isRequired
}