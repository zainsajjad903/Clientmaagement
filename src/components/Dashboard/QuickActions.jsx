// components/Dashboard/QuickActions.jsx
import {
  FaPlus,
  FaUserPlus,
  FaFileImport,
  FaChartBar,
  FaBell,
  FaCog,
} from "react-icons/fa";

const QuickActions = () => {
  const actions = [
    {
      icon: FaUserPlus,
      title: "Add Client",
      description: "Add new client to system",
      color: "blue",
      path: "/clients/new",
    },
    {
      icon: FaFileImport,
      title: "Import Data",
      description: "Bulk import clients",
      color: "green",
      path: "/import",
    },
    {
      icon: FaChartBar,
      title: "Generate Report",
      description: "Create custom reports",
      color: "purple",
      path: "/reports",
    },
    {
      icon: FaBell,
      title: "Set Reminder",
      description: "Create new follow-up",
      color: "orange",
      path: "/followups/new",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 text-left"
            >
              <div
                className={`p-2 rounded-lg ${getColorClasses(
                  action.color
                )} text-white`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {action.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
