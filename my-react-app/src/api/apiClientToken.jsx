
//api client baase
export async function apiRequestToken(endpoint, options = {}) {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    console.log("API REQUEST START");
    console.log("token user:", token);
    console.log("endpoint:", endpoint);

    let response;

    try {
        response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
                
            },
            ...options
        });
    } catch {
        // Network error
        throw new Error("Problema di connessione al server");
    }

    let result;

    try {
        result = await response.json();
    } catch {
        // tecnic error
        throw new Error("Risposta server non valida");
    }

    console.log("stampo", result);

    return result;
}

