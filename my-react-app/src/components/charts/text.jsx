import {
    RadialBarChart,
    RadialBar,
    PolarAngleAxis,
    Tooltip,

} from "recharts";

export default function GoalChart({
    goal = 100,
    value = 90,
    label = "Obiettivo"
}) {

    const progress = Math.min((value / goal) * 100, 100);
    const remaining = Math.max(goal - value, 0);

    // 🎯 colore dinamico (più pulito, NON if multipli)
    const getColor = (p) => {
        if (p < 35) return "rgba(131, 54, 61, 0.8)";
        if (p < 53) return "rgba(226, 180, 80, 0.9)";
        if (p < 85) return "rgba(162, 189, 44, 0.9)";
        return "rgba(77, 154, 85, 0.8)";
    };

    const data = [
        {
            name: "progress",
            value: progress,
            fill: getColor(progress)
        }
    ];

    return (
        <div style={{ textAlign: "center", width: 280 }}>

            <RadialBarChart
                width={280}
                height={200}
                cx="50%"
                cy="100%"
                innerRadius="70%"
                outerRadius="100%"
                data={data}
                startAngle={180}
                endAngle={0}
            >
                <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    tick={false}
                />

                <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                />

                <Tooltip />
                
            </RadialBarChart>

            {/* 🎯 CENTRO STILE DASHBOARD */}
            <div style={{ marginTop: -40 }}>
                <h2 style={{ margin: 0, fontSize: "32px" }}>
                    {progress.toFixed(0)}%
                </h2>

                <p style={{ margin: 0, fontWeight: 500 }}>
                    {label}
                </p>

                <div style={{ marginTop: 10, fontSize: 14 }}>
                    <p>Obiettivo: €{goal}</p>
                    <p>Raggiunto: €{value}</p>
                    <p>Mancano: €{remaining}</p>
                </div>
            </div>

        </div>
    );
}