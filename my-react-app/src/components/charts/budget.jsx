import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine
} from "recharts";

export default function BudgetLinearChart({result}) {

    const budget = Number(result?.limit_amount ?? 0);
    const spent = Number(result?.spent ?? 0);
    const remaining = Number(result?.remaining ?? 0);
    const progress = Number(result?.progress ?? 0);

    const description = result?.description || "budget";
    const start = result?.start_date || "--/--/----";
    const end = result?.end_date || "--/--/----";


    const data = [
        {
            name: description,
            budget: budget,
            speso: spent,
            start: start,
            end : end
        }
    ];




    return (
        <div style={{
            width: "100%",
            maxWidth: 500,
            margin: "0 auto",
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 0 15px rgba(0,0,0,0.1)"
        }}>

            <h3 style={{ textAlign: "center" }}>
                {description || "Non vi sono budget specifici di questo mese"}
            </h3>

            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data} layout="vertical">

                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" hide />

                    <Tooltip />

                    {/* linea budget massimo */}
                    <ReferenceLine x={1000} stroke="red" strokeDasharray="4 4" />

                    {/* budget base (sfondo) */}
                    <Bar
                        dataKey="budget"
                        fill="#FBBF24"
                        barSize={25}
                    />

                    {/* spesa reale */}
                    <Bar
                        dataKey="speso"
                        fill="#ef4444"
                        barSize={25}
                    />

                </BarChart>
            </ResponsiveContainer>

            {/* dettagli */}
            <div style={{
                marginTop: 10,
                fontFamily: "Arial",
                fontSize: 17
            }}>
                <p style={{
                    color: "gold",
                    fontWeight: "bold"
                }}
                >Budget: {budget} €</p>
                <p style={{
                    color: "red"

                }}>Speso: {spent} €</p>
                <p>Percentuale: {progress.toFixed(2)} %</p>
                <p>Range:{start}/{end}</p>

                <p style={{
                    color: remaining < 0 ? "red" : "green",
                    fontWeight: "bold"
                }}>
                    {remaining < 0
                        ? `Superato: ${remaining}€`
                        : `Rimasto: ${remaining}€`
                    }
                </p>
            </div>

        </div>
    );
}