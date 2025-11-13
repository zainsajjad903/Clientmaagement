// components/Clients/ClientStats.jsx
import { FaUsers, FaClock, FaCheckCircle, FaPauseCircle } from "react-icons/fa";

const ClientStats = ({ clients }) => {
  const stats = {
    total: clients.length,
    active: clients.filter((c) => c.status === "active").length,
    leads: clients.filter((c) => c.status === "lead").length,
    inactive: clients.filter((c) => c.status === "inactive").length,
  };

  const getPercentage = (count) => {
    return clients.length > 0 ? ((count / clients.length) * 100).toFixed(1) : 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Total Clients */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Clients
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {stats.total}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              All time clients
            </p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <FaUsers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Active Clients */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Active Clients
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {stats.active}
            </p>
            <div className="flex items-center mt-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${getPercentage(stats.active)}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                {getPercentage(stats.active)}%
              </span>
            </div>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
            <FaCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      {/* Leads */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              New Leads
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {stats.leads}
            </p>
            <div className="flex items-center mt-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${getPercentage(stats.leads)}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                {getPercentage(stats.leads)}%
              </span>
            </div>
          </div>
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-full">
            <FaClock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Inactive Clients */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Inactive
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {stats.inactive}
            </p>
            <div className="flex items-center mt-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gray-500 h-2 rounded-full"
                  style={{ width: `${getPercentage(stats.inactive)}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                {getPercentage(stats.inactive)}%
              </span>
            </div>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-full">
            <FaPauseCircle className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientStats;
