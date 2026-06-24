import { apiRequestToken } from "./apiClientToken";

export function insertBudget(data) {

    console.log("api date : ", data)
    
    return apiRequestToken("/api/budgets", {
        method: "POST",
        body: JSON.stringify(data)
    });
}