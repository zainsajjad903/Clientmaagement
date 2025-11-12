// components/Dashboard/StatsCards.jsx
import {
  FaUsers,
  FaProjectDiagram,
  FaBell,
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const StatsCards = () => {
  const stats = [
    {
      title: "Total Clients",
      value: "1,248",
      change: "+12.5%",
      trend: "up",
      icon: FaUsers,
      color: "blue",
      description: "Active clients",
    },
    {
      title: "Active Projects",
      value: "47",
      change: "+5.2%",
      trend: "up",
      icon: FaProjectDiagram,
      color: "green",
      description: "In progress",
    },
    {
      title: "Follow-ups Due",
      value: "12",
      change: "-3.1%",
      trend: "down",
      icon: FaBell,
      color: "orange",
      description: "Require attention",
    },
    {
      title: "Revenue",
      value: "$84,760",
      change: "+18.3%",
      trend: "up",
      icon: FaDollarSign,
      color: "purple",
      description: "This month",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      green:
        "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      orange:
        "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
      purple:
        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <div
                  className={`flex items-center mt-2 text-sm ${
                    stat.trend === "up"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <FaArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <FaArrowDown className="h-3 w-3 mr-1" />
                  )}
                  <span>{stat.change}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    from last month
                  </span>
                </div>
              </div>
              <div
                className={`p-3 rounded-full ${getColorClasses(stat.color)}`}
              >
                <Icon className="h-6 w-6" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
