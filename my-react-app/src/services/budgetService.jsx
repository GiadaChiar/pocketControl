import { insertBudget } from "../api/budgetApi";

export async function NewBudget(start_date, end_date, limit_amount,description) {
    return await insertBudget({
        request: "newBudget",
        start_date,
        end_date,
        limit_amount,
        description 

    });
}