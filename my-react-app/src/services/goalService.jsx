import { InsertGoal, UpdateGoal } from "../api/goalApi";

export async function NewGoal(
    date,
    target_amount,
    current_amount,
    description
) {
    return await InsertGoal({
        date,
        target_amount,
        current_amount,
        description
    });
}


export async function ChangeGoal(
    idGoal,
    newValue

) {
    return await UpdateGoal({
        idGoal,
        newValue
    })
}