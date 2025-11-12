// components/Dashboard/UpcomingFollowups.jsx
import { FaClock, FaCheck, FaEllipsisH } from "react-icons/fa";

const UpcomingFollowups = () => {
  const followups = [
    {
      id: 1,
      client: "Sarah Johnson",
      type: "Phone Call",
      due: "Today, 2:00 PM",
      priority: "high",
      status: "pending",
    },
    {
      id: 2,
      client: "Mike Thompson",
      type: "Email Follow-up",
      due: "Today, 4:30 PM",
      priority: "medium",
      status: "pending",
    },
    {
      id: 3,
      client: "Emily Davis",
      type: "Contract Review",
      due: "Tomorrow, 10:00 AM",
      priority: "high",
      status: "pending",
    },
    {
      id: 4,
      client: "TechCorp Inc",
      type: "Project Update",
      due: "Jun 15, 11:00 AM",
      priority: "low",
      status: "pending",
    },
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };
    return colors[priority] || colors.medium;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Upcoming Follow-ups
        </h3>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
          4 due
        </span>
      </div>

      <div className="space-y-4">
        {followups.map((followup) => (
          <div
            key={followup.id}
            className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <FaClock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {followup.client}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {followup.type}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                    followup.priority
                  )}`}
                >
                  {followup.priority}
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {followup.due}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <button className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded">
                  <FaCheck className="h-3 w-3" />
                </button>
                <button className="p-1 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                  <FaEllipsisH className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium py-2">
        View all follow-ups
      </button>
    </div>
  );
};

export default UpcomingFollowups;
