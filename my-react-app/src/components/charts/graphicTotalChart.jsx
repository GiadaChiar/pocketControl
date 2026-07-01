import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Cell
} from "recharts";

export default function BalanceBar({ total = 0 }) {

    const data = [
        {
            name: "Saldo",
            value: Math.abs(total) // valore assoluto per la barra
        }
    ];

    const color = total >= 0 ? "#22c55e" : "#ef4444";

    return (
        <div style={{ width: "100%", maxWidth: 500 }}>

            {/* VALORE GRANDE */}
            <div style={{ fontSize: 32, fontWeight: 700 }}>
                € {Number(total).toFixed(2)}
            </div>


            {/* BAR */}
            <ResponsiveContainer width="100%" height={60}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 0, right: 20, left: 20, bottom: 0 }}
                >
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" hide />

                    <Tooltip />

                    <Bar
                        dataKey="value"
                        background={{ fill: "#eee", radius: 20 }}
                        barSize={18}
                        radius={[20, 20, 20, 20]}
                    >
                        <Cell fill={color} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

        </div>
    );
}