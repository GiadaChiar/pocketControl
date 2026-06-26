import { Pie, PieChart, Tooltip,Cell, Legend, Sector, useActiveTooltipDataPoints, useIsTooltipActive, } from 'recharts';





// #endregion
const RADIAN = Math.PI / 180;
const COLORS = ['rgba(87, 159, 213, 0.9)', 'rgb(77, 154, 85, 0.8)', 'rgba(131, 54, 61, 0.8)', 'rgb(206, 211, 98,0.8)', 'rgba(226, 180, 80, 0.9)'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
        return null;
    }
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const ncx = Number(cx);
    const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const ncy = Number(cy);
    const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
            {`${((percent ?? 1) * 100).toFixed(0)}%`}
        </text>
    );
};

const MyPieChart = (props) => {
    const p = useActiveTooltipDataPoints();
    const isAnyPieActive = useIsTooltipActive();
    const isThisPieActive = isAnyPieActive && props.payload === p?.[0];
    let fillOpacity;
    if (isAnyPieActive && !isThisPieActive) {
        fillOpacity = 0.5;
    } else {
        fillOpacity = 1;
    }
    return (
        <Sector
            {...props}
            fill={COLORS[props.index % COLORS.length]}
            fillOpacity={fillOpacity}
            style={{ transition: 'fill-opacity 0.3s ease' }}
        />
    );
};

export default function PieChartWith({ isAnimationActive = true , data}) {
    return (
        <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }} responsive>
            <Pie
                data={data}
                labelLine={false}
                label={renderCustomizedLabel}
                fill="#8884d8"
                dataKey="total"
                nameKey= "category"
                isAnimationActive={isAnimationActive}
                shape={MyPieChart}
            >
                {data.map((entry, index) => (
                    <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
}