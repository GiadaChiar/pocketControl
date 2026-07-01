import { apiRequestToken } from "./apiClientToken";

export function InsertBudget(data) {

    console.log("api date : ", data)
    
    return apiRequestToken("/api/budgets", {
        method: "POST",
        body: JSON.stringify(data)
    });
}



export function BugetSummary(data) {
    const params = new URLSearchParams();

    if (data.start_date) {
        params.append("start_date", data.start_date);
    }

    if (data.end_date) {
        params.append("end_date", data.end_date);
    }

    return apiRequestToken(
        `/api/bugetSummary?${params.toString()}`,
        {
            method: "GET"
        }
    );

}
