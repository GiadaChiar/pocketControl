

import { apiRequest } from "./apiClient";
import { apiRequestToken } from "./apiClientToken";





export function CategoriesFetch() {
    return apiRequest("/api/categories", {
        method: "GET"
    });
}


export function InsertTransaction(data) {
    return apiRequestToken("/api/operations", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export function FilterBarChar(data) {
    const params = new URLSearchParams();

    if (data.start_date) {
        params.append("start_date", data.start_date);
    }

    if (data.end_date) {
        params.append("end_date", data.end_date);
    }

    return apiRequestToken(
        `/api/monthOperations?${params.toString()}`,
        {
            method: "GET"
        }
    );
}





export function FilterPieChar(data) {
    const params = new URLSearchParams();

    if (data.start_date) {
        params.append("start_date", data.start_date);
    }

    if (data.end_date) {
        params.append("end_date", data.end_date);
    }

    if (data.typology) {
        params.append("typology", data.typology);
    }

    return apiRequestToken(
        `/api/allExpense?${params.toString()}`,
        {
            method: "GET"
        }
    );
}


export function FilterNeedleChart(data) {
    const params = new URLSearchParams();

    if (data.start_date) {
        params.append("start_date", data.start_date);
    }

    if (data.end_date) {
        params.append("end_date", data.end_date);
    }

    if (data.type) {
        params.append("type", data.type);
    }

    return apiRequestToken(
        `/api/allExpense?${params.toString()}`,
        {
            method: "GET"
        }
    );
}


export function TotalEntry() {

    return apiRequestToken(
        "/api/allEntry",
        {
            method: "GET"
        }
    );

}

