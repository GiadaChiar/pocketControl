export function formatChartData(data) {
    const grouped = {};

    data.forEach(item => {
        const key = `${item.year}-${item.month}`;

        if (!grouped[key]) {
            grouped[key] = {
                name: `${item.month}/${item.year}`,
                entrate: 0,
                spese: 0,
                totale: 0
            };
        }

        if (item.type === "entrata") {
            grouped[key].entrate = parseFloat(item.total);
        }

        if (item.type === "spesa") {
            grouped[key].spese = parseFloat(item.total);
        }

        // opzionale: totale netto
        grouped[key].totale =
            grouped[key].entrate - grouped[key].spese;
    });
    return Object.values(grouped);
}


export function formatPieData(data) {
    const format = data.map(item => ({
        category: item.category,
        total: Number(item.total)
    }));

    return format;
}