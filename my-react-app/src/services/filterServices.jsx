
import { searchFilter } from "../api/filterService";

export async function FiltersTable(
    tipology,
    start_date,
    end_date
) {
    return await searchFilter({
        tipology,
        start_date,
        end_date

    });
}