import { apiRequestToken } from "./apiClientToken";

export function insertGoal(data) {
    return apiRequestToken("/api/goals", {
        method: "POST",
        body: JSON.stringify(data)
    });
}