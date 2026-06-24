import { insertTransaction } from "../api/transactionApi"


export async function NewTransation(
    category,
    type,
    amount,
    date,
    description,
    
    ) {
    return await insertTransaction({
        category,
        type,
        amount,
        date,
        description
    })
}

