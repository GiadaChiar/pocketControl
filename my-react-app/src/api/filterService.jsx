import { apiRequestToken } from "./apiClientToken";

export function searchFilter(data) {

    
    return apiRequestToken("/api/filters", {
        method: "POST",
        body: JSON.stringify(data)
    });
}