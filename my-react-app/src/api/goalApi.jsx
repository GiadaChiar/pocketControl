import { apiRequestToken } from "./apiClientToken";

export function InsertGoal(data) {
    return apiRequestToken("/api/goals", {
        method: "POST",
        body: JSON.stringify(data)
    });
}



export function UpdateGoal(data) {
    return apiRequestToken("/api/goals/transation", {
        method: "POST",
        body: JSON.stringify(data)
    });
}