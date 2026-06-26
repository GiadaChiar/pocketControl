
import { insertTransaction, filterBarChar, filterPieChar } from "../api/transactionApi";
import { searchFilter } from "../api/filterService";



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
    typology
) {
    return await filterPieChar({
        start_date,
        end_date,
        typology
    })
}


export async function NeedleChar(
    start_date,
    end_date,
    tipology
) {
    return await searchFilter({
        start_date,
        end_date,
        tipology
    })
}