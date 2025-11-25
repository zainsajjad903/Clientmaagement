// src/components/Settings/NotificationSettings.jsx
import { useState } from "react";
import {
  FaBell,
  FaSave,
  FaEnvelope,
  FaMobile,
  FaChartLine,
} from "react-icons/fa";

const NotificationSettings = ({ data, onUpdate }) => {
  const [formData, setFormData] = useState(data);

  const handleToggle = (key) => {
    setFormData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  const notificationGroups = [
    {
      title: "Email Notifications",
      icon: FaEnvelope,
      description: "Receive notifications via email",
      settings: [
        {
          key: "emailNotifications",
          label: "Email Notifications",
          description: "Receive important updates via email",
        },
        {
          key: "followUpReminders",
          label: "Follow-up Reminders",
          description: "Get reminded about upcoming client follow-ups",
        },
        {
          key: "projectUpdates",
          label: "Project Updates",
          description: "Notifications about project progress and changes",
        },
        {
          key: "weeklyReports",
          label: "Weekly Reports",
          description: "Receive weekly performance summaries",
        },
      ],
    },
    {
      title: "In-App Notifications",
      icon: FaMobile,
      description: "Notifications within the application",
      settings: [
        {
          key: "inAppNotifications",
          label: "In-App Notifications",
          description: "Show notifications within the application",
        },
        {
          key: "teamActivity",
          label: "Team Activity",
          description: "Notifications about team member activities",
        },
      ],
    },
    {
      title: "Security & Alerts",
      icon: FaChartLine,
      description: "Security and system alerts",
      settings: [
        {
          key: "securityAlerts",
          label: "Security Alerts",
          description: "Important security and system notifications",
        },
        {
          key: "marketingEmails",
          label: "Marketing Emails",
          description: "Receive product updates and promotional content",
        },
      ],
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Notification Settings
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage how and when you receive notifications
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
        >
          <FaSave className="h-4 w-4" />
          <span>Save Preferences</span>
        </button>
      </div>

      <div className="space-y-6">
        {notificationGroups.map((group, groupIndex) => {
          const Icon = group.icon;

          return (
            <div
              key={groupIndex}
              className="border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              {/* Group Header */}
              <div className="flex items-center space-x-3 p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-t-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {group.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {group.description}
                  </p>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="p-4 space-y-4">
                {group.settings.map((setting, settingIndex) => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {setting.label}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {setting.description}
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle(setting.key)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        formData[setting.key]
                          ? "bg-blue-600"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          formData[setting.key]
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Notification Preferences */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <FaBell className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Notification Delivery
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
              Notifications are delivered in real-time. You can customize the
              frequency and delivery method for each type of notification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
