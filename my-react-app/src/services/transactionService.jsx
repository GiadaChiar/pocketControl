import { insertTransaction } from "../api/transactionApi";
import { filterBarChar } from "../api/transactionApi";
import { filterPieChar } from "../api/transactionApi";


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

export async function BarCharDate(
    start_date,
    end_date
) {
    return await filterBarChar({
        start_date,
        end_date
    })
}



export async function PieCharDate(start_date,
    end_date,
    type
) {
    return await filterPieChar({
        start_date,
        end_date,
        type
    })
}