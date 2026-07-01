
import { searchFilter } from "../api/filterService";
import { deleteElementTable } from "../api/filterService";

export async function FiltersTable(
    tipology,
    start_date,
    end_date,
    extra_type
) {
    return await searchFilter({
        tipology,
        start_date,
        end_date,
        extra_type
    });

}


export async function DeleteFilterTable(
    id,
    type
) {
    return await deleteElementTable({
        id,
        type
    });
}

