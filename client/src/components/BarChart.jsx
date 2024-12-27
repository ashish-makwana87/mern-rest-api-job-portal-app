import {
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function BarChartContainer({ data }) {
  
  return <ResponsiveContainer width='100%' height={300}>
  <BarChart data={data} margin={{top: 30}}>
  <CartesianGrid strokeDasharray='3 3' />
  <XAxis dataKey='date' />
  <YAxis allowDecimals={false} />
  <Tooltip />
  <Bar dataKey='count' fill='#6671e5' barSize={65} />
  </BarChart>
  </ResponsiveContainer>;
}

export default BarChartContainer;
