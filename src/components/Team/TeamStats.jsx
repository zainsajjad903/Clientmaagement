// src/components/Team/TeamStats.jsx
import {
  FaUsers,
  FaUserShield,
  FaUserCheck,
  FaUserClock,
  FaChartLine,
  FaMapMarkerAlt,
} from "react-icons/fa";

const TeamStats = ({ members }) => {
  const stats = {
    total: members.length,
    active: members.filter((member) => member.status === "active").length,
    pending: members.filter((member) => member.status === "pending").length,
    admins: members.filter((member) => member.role === "admin").length,
    managers: members.filter((member) => member.role === "manager").length,
    members: members.filter((member) => member.role === "member").length,
    viewers: members.filter((member) => member.role === "viewer").length,
  };

  const getPercentage = (count) => {
    return members.length > 0 ? ((count / members.length) * 100).toFixed(1) : 0;
  };

  const statItems = [
    {
      label: "Total Members",
      value: stats.total,
      change: "+2",
      changeType: "positive",
      icon: FaUsers,
      color: "blue",
    },
    {
      label: "Active Members",
      value: stats.active,
      change: "+1",
      changeType: "positive",
      icon: FaUserCheck,
      color: "green",
    },
    {
      label: "Pending Invites",
      value: stats.pending,
      change: "+1",
      changeType: "neutral",
      icon: FaUserClock,
      color: "yellow",
    },
    {
      label: "Administrators",
      value: stats.admins,
      change: "0",
      changeType: "neutral",
      icon: FaUserShield,
      color: "red",
    },
    {
      label: "Managers",
      value: stats.managers,
      change: "0",
      changeType: "neutral",
      icon: FaChartLine,
      color: "purple",
    },
    {
      label: "Remote Workers",
      value: members.filter((member) => member.location === "Remote").length,
      change: "+1",
      changeType: "positive",
      icon: FaMapMarkerAlt,
      color: "indigo",
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
      yellow: {
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
        text: "text-yellow-600 dark:text-yellow-400",
        change: "text-yellow-700 dark:text-yellow-300",
      },
      red: {
        bg: "bg-red-50 dark:bg-red-900/20",
        text: "text-red-600 dark:text-red-400",
        change: "text-red-700 dark:text-red-300",
      },
      purple: {
        bg: "bg-purple-50 dark:bg-purple-900/20",
        text: "text-purple-600 dark:text-purple-400",
        change: "text-purple-700 dark:text-purple-300",
      },
      indigo: {
        bg: "bg-indigo-50 dark:bg-indigo-900/20",
        text: "text-indigo-600 dark:text-indigo-400",
        change: "text-indigo-700 dark:text-indigo-300",
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
      {statItems.map((stat, index) => {
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
                <div className="flex items-center mt-2">
                  <span
                    className={`text-xs ${
                      stat.changeType === "positive"
                        ? "text-green-600 dark:text-green-400"
                        : stat.changeType === "negative"
                        ? "text-red-600 dark:text-red-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {stat.changeType === "positive"
                      ? "↗"
                      : stat.changeType === "negative"
                      ? "↘"
                      : "→"}{" "}
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                    this month
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

export default TeamStats;
