/**
 * Représente une erreur envoyée par l'API
 */
export class apiErrors {
    constructor(errors) {
        this.errors = errors
    }
}

/**
 * @param {string} endpoint
 * @param {object} options
 */
export async function apiFetch (endpoint, options = {}) {
    const response = await fetch('http://localhost:3333' + endpoint, {
        // transfère les cookies au serveurs 
        credentials: 'include',
        headers: {
            Accept: 'application/json'
        },
        ...options
    })

    // 204 = pas de contenu, no body
    if (response.status === 204) {
        return null
    }

    const responseData = await response.json()
    if (response.ok) {
        return responseData
    } else {
        if (responseData.errors) {
            throw new apiErrors(responseData.errors)
        }
    }

}