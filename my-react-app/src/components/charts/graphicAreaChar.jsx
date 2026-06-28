import { useState } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
    ReferenceDot
} from "recharts";

export function AreaChartExample({
    data = [],
    isAnimationActive = true
}) {


    const chartData = data.map(item => ({
        ...item,
        entrate: Number(item.entrate),
        spese: Number(item.spese),
        totale: Number(item.totale)
    }));

    // default spese
    const [metric, setMetric] = useState("spese");


    // colors 
    const colors = {
        entrate: "#22c55e",
        spese: "#ef4444",
        "totale": "#FBBF24"
    };

    const color = colors[metric];

    // mese con valore massimo
    const maxItem = chartData.reduce((max, item) => {
        if (!max || item[metric] > max[metric]) return item;
        return max;
    }, null);

    return (
        <div
            style={{
                width: "100%",
                maxWidth: '700px',
                maxHeight: '70vh',
                marginTop: '70px',
                marginBottom: '50px',
                background: "#fff",

                borderRadius: 16,
                padding: 20,
                boxShadow: "0 5px 20px rgba(0,0,0,.08)"
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20
                }}
            >

                <h3 tyle={{
                    color: "rgba(6, 1, 36)",
                }}>Andamento {metric}</h3>

                <select
                    value={metric}
                    onChange={(e) => setMetric(e.target.value)}
                >
                    <option value="entrate">Entrate</option>
                    <option value="spese">Spese</option>
                    <option value="totale">Totale</option>
                </select>

            </div>

            <ResponsiveContainer width="100%" height={350}>

                <AreaChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 10,
                        bottom: 10
                    }}
                >

                    <defs>

                        <linearGradient
                            id="areaGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="5%"
                                stopColor={color}
                                stopOpacity={0.6}
                            />

                            <stop
                                offset="95%"
                                stopColor={color}
                                stopOpacity={0}
                            />

                        </linearGradient>

                    </defs>

                    <CartesianGrid strokeDasharray="4 4" />

                    <XAxis dataKey="name" />

                    <YAxis width={70} />

                    <Tooltip
                        formatter={(value) => [
                            `${Number(value).toFixed(2)} €`,
                            metric.charAt(0).toUpperCase() + metric.slice(1)
                        ]}
                    />

                    <Area
                        type="monotone"
                        dataKey={metric}
                        stroke={color}
                        strokeWidth={3}
                        fill="url(#areaGradient)"
                        isAnimationActive={isAnimationActive}
                        animationDuration={900}
                    />

                    {maxItem && (

                        <ReferenceDot
                            x={maxItem.name}
                            y={maxItem[metric]}
                            r={7}
                            fill={color}
                            stroke="#000"
                            label={{
                                value: "Picco",
                                position: "top"
                            }}
                        />

                    )}

                </AreaChart>

            </ResponsiveContainer>

            {maxItem && (

                <div
                    style={{
                        marginTop: 15,
                        fontSize: 15,
                        textAlign: "center"
                    }}
                >
                    <strong>Mese con il valore massimo:</strong>{" "}
                    {maxItem.name}
                    {" - "}
                    {maxItem[metric].toFixed(2)} €
                </div>

            )}

        </div>
    );
}