// components/Dashboard/RecentActivities.jsx
import {
  FaUserPlus,
  FaFileAlt,
  FaComment,
  FaCheckCircle,
} from "react-icons/fa";

const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      type: "new_client",
      message: 'New client "Sarah Johnson" added',
      time: "2 hours ago",
      icon: FaUserPlus,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "document",
      message: "Contract signed by Mike Thompson",
      time: "4 hours ago",
      icon: FaFileAlt,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "communication",
      message: "New message from Emily Davis",
      time: "6 hours ago",
      icon: FaComment,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "completion",
      message: 'Project "Website Redesign" completed',
      time: "1 day ago",
      icon: FaCheckCircle,
      color: "text-green-600",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activities
      </h3>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div
                className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-700 ${activity.color}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white">
                  {activity.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 text-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium py-2">
        View all activities
      </button>
    </div>
  );
};

export default RecentActivities;
