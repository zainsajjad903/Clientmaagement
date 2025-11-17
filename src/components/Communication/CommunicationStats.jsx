// src/components/Communication/CommunicationStats.jsx
import {
  FaPhone,
  FaEnvelope,
  FaVideo,
  FaComment,
  FaWhatsapp,
} from "react-icons/fa";

const CommunicationStats = ({ communications }) => {
  const stats = {
    total: communications.length,
    calls: communications.filter((c) => c.type === "call").length,
    emails: communications.filter((c) => c.type === "email").length,
    meetings: communications.filter((c) => c.type === "meeting").length,
    whatsapp: communications.filter((c) => c.type === "whatsapp").length,
  };

  const getPercentage = (count) => {
    return communications.length > 0
      ? ((count / communications.length) * 100).toFixed(1)
      : 0;
  };

  const getIcon = (type) => {
    const icons = {
      calls: FaPhone,
      emails: FaEnvelope,
      meetings: FaVideo,
      whatsapp: FaWhatsapp,
      total: FaComment,
    };
    return icons[type];
  };

  const getColorClasses = (type) => {
    const colors = {
      total: {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        text: "text-blue-600 dark:text-blue-400",
        bar: "bg-blue-500",
      },
      calls: {
        bg: "bg-green-50 dark:bg-green-900/20",
        text: "text-green-600 dark:text-green-400",
        bar: "bg-green-500",
      },
      emails: {
        bg: "bg-purple-50 dark:bg-purple-900/20",
        text: "text-purple-600 dark:text-purple-400",
        bar: "bg-purple-500",
      },
      meetings: {
        bg: "bg-orange-50 dark:bg-orange-900/20",
        text: "text-orange-600 dark:text-orange-400",
        bar: "bg-orange-500",
      },
      whatsapp: {
        bg: "bg-green-50 dark:bg-green-900/20",
        text: "text-green-600 dark:text-green-400",
        bar: "bg-green-500",
      },
    };
    return colors[type] || colors.total;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {Object.entries(stats).map(([key, value]) => {
        const Icon = getIcon(key);
        const color = getColorClasses(key);

        return (
          <div
            key={key}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                  {key === "whatsapp" ? "WhatsApp" : key}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {value}
                </p>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${color.bar}`}
                      style={{ width: `${getPercentage(value)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {getPercentage(value)}%
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${color.bg}`}>
                <Icon className={`h-5 w-5 ${color.text}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommunicationStats;
