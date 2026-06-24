

import { apiRequest } from "./apiClient";
import { apiRequestToken } from "./apiClientToken";




export function CategoriesFetch() {
    return apiRequest("/api/categories", {
        method: "GET"
    });
}


export function insertTransaction(data) {
    return apiRequestToken("/api/operations", {
        method: "POST",
        body: JSON.stringify(data)
    });
}