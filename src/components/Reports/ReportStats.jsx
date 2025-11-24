// src/components/Reports/ReportStats.jsx
import {
  FaUsers,
  FaMoneyBillWave,
  FaProjectDiagram,
  FaClipboardList,
  FaChartLine,
  FaPercentage,
} from "react-icons/fa";

const ReportStats = ({ data }) => {
  const stats = [
    {
      label: "Total Clients",
      value: data.totalClients,
      change: "+12%",
      changeType: "positive",
      icon: FaUsers,
      color: "blue",
    },
    {
      label: "Active Projects",
      value: data.activeProjects,
      change: "+5%",
      changeType: "positive",
      icon: FaProjectDiagram,
      color: "green",
    },
    {
      label: "Completed Projects",
      value: data.completedProjects,
      change: "+8%",
      changeType: "positive",
      icon: FaClipboardList,
      color: "purple",
    },
    {
      label: "Total Revenue",
      value: `$${data.totalRevenue.toLocaleString()}`,
      change: "+15%",
      changeType: "positive",
      icon: FaMoneyBillWave,
      color: "yellow",
    },
    {
      label: "Conversion Rate",
      value: `${data.conversionRate}%`,
      change: "+3%",
      changeType: "positive",
      icon: FaPercentage,
      color: "indigo",
    },
    {
      label: "Avg Project Value",
      value: `$${data.avgProjectValue.toLocaleString()}`,
      change: "+7%",
      changeType: "positive",
      icon: FaChartLine,
      color: "pink",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        text: "text-blue-600 dark:text-blue-400",
        change: "text-blue-700 dark:text-blue-300",
      },
      green: {
        bg: "bg-green-50 dark:bg-green-900/20",
        text: "text-green-600 dark:text-green-400",
        change: "text-green-700 dark:text-green-300",
      },
      purple: {
        bg: "bg-purple-50 dark:bg-purple-900/20",
        text: "text-purple-600 dark:text-purple-400",
        change: "text-purple-700 dark:text-purple-300",
      },
      yellow: {
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
        text: "text-yellow-600 dark:text-yellow-400",
        change: "text-yellow-700 dark:text-yellow-300",
      },
      indigo: {
        bg: "bg-indigo-50 dark:bg-indigo-900/20",
        text: "text-indigo-600 dark:text-indigo-400",
        change: "text-indigo-700 dark:text-indigo-300",
      },
      pink: {
        bg: "bg-pink-50 dark:bg-pink-900/20",
        text: "text-pink-600 dark:text-pink-400",
        change: "text-pink-700 dark:text-pink-300",
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colorClasses = getColorClasses(stat.color);

        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <div
                  className={`flex items-center mt-2 text-sm ${colorClasses.change}`}
                >
                  <span
                    className={`inline-flex items-center ${
                      stat.changeType === "positive"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stat.changeType === "positive" ? "↗" : "↘"} {stat.change}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    from last period
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${colorClasses.bg}`}>
                <Icon className={`h-5 w-5 ${colorClasses.text}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReportStats;
