import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



// #region Sample data


// #endregion
export default function SimpleBarChart({data}){
    return (
        
        <BarChart
            style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={data}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width="auto" />
            <Tooltip  />
            <Legend />
            <Bar dataKey="entrate" fill="#22c55e" activeBar={{ fill: 'rgb(77, 154, 85)', stroke: 'black' }} radius={[5, 5, 0, 0]}  />
            <Bar dataKey="spese" fill="#ef4444" activeBar={{ fill: 'rgba(131, 54, 61)', stroke: 'black' }} radius={[5, 5, 0, 0]} />
            <Bar dataKey="totale" fill="#FBBF24" activeBar={{ fill: 'rgb(206, 211, 98)', stroke: 'black' }} radius={[5, 5, 0, 0]} />
        </BarChart>
    );
};