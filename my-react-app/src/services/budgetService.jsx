import { InsertBudget, BugetSummary } from "../api/budgetApi";

export async function NewBudget(start_date, end_date, limit_amount, description) {
    return await InsertBudget({
        request: "newBudget",
        start_date,
        end_date,
        limit_amount,
        description

    });
}


//chartBugets  
export async function BugetsChar(
    start_date,
    end_date,
) {
    return await BugetSummary({
        start_date,
        end_date
    })
}