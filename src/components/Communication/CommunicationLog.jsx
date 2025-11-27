// src/components/Communication/CommunicationLog.jsx
import {
  FaPhone,
  FaEnvelope,
  FaVideo,
  FaWhatsapp,
  FaPaperclip,
  FaUser,
  FaClock,
  FaCalendar,
  FaComment,
} from "react-icons/fa";

const CommunicationLog = ({ communications }) => {
  const getTypeIcon = (type) => {
    const icons = {
      call: FaPhone,
      email: FaEnvelope,
      meeting: FaVideo,
      whatsapp: FaWhatsapp,
    };
    const Icon = icons[type] || FaComment;
    return <Icon className="h-4 w-4" />;
  };

  const getTypeColor = (type) => {
    const colors = {
      call: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      email:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      meeting:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      whatsapp:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };
    return (
      colors[type] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    );
  };

  const getTypeLabel = (type) => {
    const labels = {
      call: "Phone Call",
      email: "Email",
      meeting: "Meeting",
      whatsapp: "WhatsApp",
    };
    return labels[type] || type;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      relative: getRelativeTime(date),
    };
  };

  const getRelativeTime = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  if (communications.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <FaComment className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No communications found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your search filters or log a new communication.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {communications.map((communication) => {
        const formattedDate = formatDate(communication.date);

        return (
          <div
            key={communication.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              {/* Left Section - Client and Basic Info */}
              <div className="flex-1">
                <div className="flex items-start space-x-4">
                  {/* Client Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {communication.client.avatar}
                    </div>
                  </div>

                  {/* Communication Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {communication.client.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {communication.client.company}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* Type Badge */}
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            communication.type
                          )}`}
                        >
                          {getTypeIcon(communication.type)}
                          <span className="ml-1.5">
                            {getTypeLabel(communication.type)}
                          </span>
                        </span>

                        {/* Date */}
                        <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                          <FaClock className="h-3 w-3" />
                          <span>{formattedDate.relative}</span>
                        </div>
                      </div>
                    </div>

                    {/* Subject */}
                    <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                      {communication.subject}
                    </h4>

                    {/* Summary */}
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {communication.summary}
                    </p>

                    {/* Participants */}
                    <div className="flex items-center space-x-2 mb-3">
                      <FaUser className="h-3 w-3 text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {communication.participants.join(", ")}
                      </span>
                    </div>

                    {/* Files */}
                    {communication.files.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <FaPaperclip className="h-3 w-3 text-gray-400" />
                        <div className="flex flex-wrap gap-2">
                          {communication.files.map((file, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            >
                              {file}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {communication.notes && (
                      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>Notes:</strong> {communication.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Section - Actions and Metadata */}
              <div className="flex flex-col items-end space-y-3">
                {/* Detailed Date */}
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {formattedDate.date}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {formattedDate.time}
                  </div>
                  {communication.duration && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {communication.duration}
                    </div>
                  )}
                </div>

                {/* Follow-up Required */}
                {communication.followUpRequired && (
                  <div className="flex items-center space-x-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full text-sm">
                    <FaCalendar className="h-3 w-3" />
                    <span>
                      Follow-up:{" "}
                      {new Date(
                        communication.followUpDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200">
                    View Details
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition duration-200">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommunicationLog;
