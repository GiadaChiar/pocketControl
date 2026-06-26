import {
    RadialBarChart,
    RadialBar,
    PolarAngleAxis,
} from "recharts";

export default function RadialChart({ result }) {
    const value = result?.current_amount ?? 0;
    const goal = result?.target_amount ?? 1;
    const description = result?.description || "Obiettivo";



    const progress = Math.min((value / goal) * 100, 100);
    const remaining = Math.max(goal - value, 0);

    
    const getColor = (p) => {
        if (p < 35) return "rgba(131, 54, 61, 0.8)";
        if (p < 53) return "rgba(226, 180, 80, 0.9)";
        if (p < 85) return "rgba(162, 189, 44, 0.9)";
        if (p >= 85) return "rgba(77, 154, 85, 0.8)";
        return "rgba(77, 154, 85, 0.85)";
    };


    const data = [
        {
            name: description,
            value: progress,
        }
    ];

    return (
        <div style={{ textAlign: "center", width: 380 }}>

            <RadialBarChart
                width={380}
                height={300}
                cx="50%"
                cy="100%"
                innerRadius="60%"
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
                    background={{ fill: "rgb(248, 244, 244, 0.8)" }}
                    fill={getColor(progress)}
                />
                
            </RadialBarChart>

            <div style={{ marginTop: -40 }}>
                <h2 style={{ margin: 0, fontSize: "32px" }}>
                    {progress.toFixed(0)}%
                </h2>

                <p style={{ margin: 0, fontWeight: 500 }}>
                    {description}
                </p>

                <div style={{ marginTop: 20, fontSize: 18 }}>
                    <p>Obiettivo: €{goal}</p>
                    <p>Raggiunto: €{value}</p>
                    <p>Mancano: €{remaining}</p>
                </div>
            </div>

        </div>
    );
}