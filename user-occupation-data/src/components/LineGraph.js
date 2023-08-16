import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import '../css/LineGraph.css';
//import { DateTime } from "luxon";

export default function LineGraph(props) {

    //console.log(props.revenues)

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
        <LineChart width={200} height={150} data={data}>
            <XAxis dataKey='time' tickFormatter={dateFormat} />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Line type='monotone' dataKey='revenue' dot={false} />
        </LineChart>
        </div>
    )
}
//stroke="#8884d8"