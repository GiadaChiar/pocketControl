import { insertGoal } from "../api/goalApi";

export async function NewGoal(date, target_amount,current_amount,description) {
    return await insertGoal({
        request: "newGoal",
        date,
        target_amount,
        current_amount,
        description 

    });
}