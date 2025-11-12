// components/Dashboard/PerformanceCharts.jsx
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PerformanceCharts = ({ timeRange }) => {
  // Mock data - replace with real data
  const revenueData = [
    { month: "Jan", revenue: 4000, clients: 24 },
    { month: "Feb", revenue: 3000, clients: 18 },
    { month: "Mar", revenue: 5000, clients: 30 },
    { month: "Apr", revenue: 2780, clients: 22 },
    { month: "May", revenue: 1890, clients: 15 },
    { month: "Jun", revenue: 6390, clients: 42 },
  ];

  const projectStatusData = [
    { status: "Lead", count: 12 },
    { status: "Proposal", count: 8 },
    { status: "Discussion", count: 15 },
    { status: "Negotiation", count: 6 },
    { status: "Ongoing", count: 25 },
    { status: "Completed", count: 18 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Performance Metrics
        </h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg">
            Revenue
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            Clients
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Revenue Trend
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Project Status Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Project Status
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={projectStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="status" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCharts;
