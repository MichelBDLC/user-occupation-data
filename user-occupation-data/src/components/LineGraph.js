import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function LineGraph(props) {

    const data = props.revenues.filter(entry => entry.revenue > 0).map(entry => ({
        time: entry.time,
        revenue: entry.revenue,
    }));

    function dateFormat(time) {
        const date = new Date(time);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    }

    return (
        <div className="chart">
        <LineChart width={270} height={170} data={data}>
            <XAxis dataKey='time' tickFormatter={dateFormat} tick={{ fontSize: 7 }} />
            <YAxis tick={{ fontSize: 7 }} />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Line type='monotone' dataKey='revenue' dot={false} />
        </LineChart>
        </div>
    )
}
