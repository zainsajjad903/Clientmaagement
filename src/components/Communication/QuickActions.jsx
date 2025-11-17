// src/components/Communication/QuickActions.jsx
import {
  FaPhone,
  FaEnvelope,
  FaVideo,
  FaWhatsapp,
  FaCalendar,
} from "react-icons/fa";

const QuickActions = ({ onQuickAction }) => {
  const actions = [
    {
      icon: FaPhone,
      title: "Quick Call",
      description: "Log a phone call",
      type: "call",
      color: "bg-green-500",
    },
    {
      icon: FaEnvelope,
      title: "Send Email",
      description: "Log an email",
      type: "email",
      color: "bg-purple-500",
    },
    {
      icon: FaVideo,
      title: "Schedule Meeting",
      description: "Schedule video call",
      type: "meeting",
      color: "bg-orange-500",
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp Message",
      description: "Send quick message",
      type: "whatsapp",
      color: "bg-green-500",
    },
    {
      icon: FaCalendar,
      title: "Plan Follow-up",
      description: "Schedule follow-up",
      type: "followup",
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={() => onQuickAction(action.type)}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition duration-200 group"
            >
              <div
                className={`p-3 rounded-full ${action.color} text-white mb-3 group-hover:scale-110 transition duration-200`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                {action.title}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                {action.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
