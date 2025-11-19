// src/components/Followups/FollowupStats.jsx
import {
  FaClock,
  FaExclamationTriangle,
  FaCheck,
  FaCalendarAlt,
} from "react-icons/fa";

const FollowupStats = ({ followups }) => {
  const stats = {
    total: followups.length,
    pending: followups.filter((f) => f.status === "pending").length,
    overdue: followups.filter((f) => {
      const dueDate = new Date(f.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return dueDate < today && f.status !== "completed";
    }).length,
    completed: followups.filter((f) => f.status === "completed").length,
    today: followups.filter((f) => {
      const dueDate = new Date(f.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return (
        dueDate.toDateString() === today.toDateString() &&
        f.status !== "completed"
      );
    }).length,
  };

  const getPercentage = (count) => {
    return followups.length > 0
      ? ((count / followups.length) * 100).toFixed(1)
      : 0;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {/* Total Follow-ups */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {stats.total}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              All follow-ups
            </p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <FaCalendarAlt className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Due Today */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Due Today
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {stats.today}
            </p>
            <div className="flex items-center mt-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${getPercentage(stats.today)}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                {getPercentage(stats.today)}%
              </span>
            </div>
          </div>
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-full">
            <FaClock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Overdue */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Overdue
            </p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
              {stats.overdue}
            </p>
            <div className="flex items-center mt-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${getPercentage(stats.overdue)}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                {getPercentage(stats.overdue)}%
              </span>
            </div>
          </div>
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-full">
            <FaExclamationTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </div>

      {/* Pending */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Pending
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {stats.pending}
            </p>
            <div className="flex items-center mt-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${getPercentage(stats.pending)}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                {getPercentage(stats.pending)}%
              </span>
            </div>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <FaClock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Completed */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Completed
            </p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
              {stats.completed}
            </p>
            <div className="flex items-center mt-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${getPercentage(stats.completed)}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                {getPercentage(stats.completed)}%
              </span>
            </div>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
            <FaCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowupStats;
