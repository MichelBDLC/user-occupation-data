import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import Popup from 'reactjs-popup';
import '../css/LineGraph.css';

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
            <Popup trigger={<div>
                <LineChart width={270} height={170} data={data} >
                <XAxis dataKey='time' tickFormatter={dateFormat} tick={{ fontSize: 7 }} />
                <YAxis tick={{ fontSize: 7 }} />
                <CartesianGrid strokeDasharray='3 3' />
                <Tooltip />
                <Line type='monotone' dataKey='revenue' dot={false} />
                </LineChart>
                </div>
            } modal >
                {
                    close => (
                        <div className="modal">
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                            <LineChart width={670} height={470} data={data}>
                            <XAxis dataKey='time' tickFormatter={dateFormat} tick={{ fontSize: 17 }} />
                            <YAxis tick={{ fontSize: 17 }} />
                            <CartesianGrid strokeDasharray='3 3' />
                            <Tooltip />
                            <Line type='monotone' dataKey='revenue' dot={false} />
                            </LineChart>
                        </div>
                    )
                }
            </Popup>
        </div>
    )
}
