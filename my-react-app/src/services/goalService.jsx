import { insertGoal, UpdateGoal } from "../api/goalApi";

export async function NewGoal(
    date,
    target_amount,
    current_amount,
    description
) {
    return await insertGoal({
        date,
        target_amount,
        current_amount,
        description 

    });
}


export async function ChangeGoal(
    idGoal,
    newValue

){
    return await UpdateGoal({
        idGoal,
        newValue
    })
}