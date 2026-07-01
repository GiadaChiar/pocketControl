
import { InsertTransaction, FilterBarChar, FilterPieChar, TotalEntry } from "../api/transactionApi";
import { searchFilter } from "../api/filterService";



export async function NewTransation(
    category,
    type,
    amount,
    date,
    description,

) {
    return await InsertTransaction({
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
    return await FilterBarChar({
        start_date,
        end_date
    })
}



export async function PieCharDate(
    start_date,
    end_date,
    typology
) {
    return await FilterPieChar({
        start_date,
        end_date,
        typology
    })
}

//chart goals and bugets
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




export async function Total() {
    return await TotalEntry();
}


