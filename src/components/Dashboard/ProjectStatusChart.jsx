// components/Dashboard/ProjectStatusChart.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Lead", value: 10 },
  { name: "Proposal", value: 8 },
  { name: "Discussion", value: 6 },
  { name: "Negotiation", value: 4 },
  { name: "Ongoing", value: 12 },
  { name: "Completed", value: 20 },
  { name: "Lost", value: 5 },
];

const ProjectStatusChart = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Projects by Status
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectStatusChart;
