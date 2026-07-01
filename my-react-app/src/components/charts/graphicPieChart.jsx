import { Pie, PieChart, Tooltip,Cell, Legend, Sector, useActiveTooltipDataPoints, useIsTooltipActive, } from 'recharts';





// #endregion
const RADIAN = Math.PI / 180;
const COLORS = ['#22c55e', '#ef4444', '#FBBF24', 'rgb(206, 211, 98,0.8)', 'rgba(226, 80, 170, 0.9)', '#3b82f6'];

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

export default function PieChartWith({ isAnimationActive = true , data = []}) {
    const hasData = data.length > 0;
    if (!hasData) {
        return (
            <div style={{
                width: '100%',
                maxWidth: '450px',
                aspectRatio: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                background: '#f3f4f6'
            }}>
                <p style={{ color: '#6b7280' }}>
                    Nessun dato da visualizzare
                </p>
            </div>
        );
    }
    
    return (
        <PieChart style={{ width: '100%', maxWidth: '450px', maxHeight: '80vh', aspectRatio: 1 }} responsive>
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