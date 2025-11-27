// src/components/Followups/FollowupList.jsx
import {
  FaPhone,
  FaEnvelope,
  FaVideo,
  FaWhatsapp,
  FaCheck,
  FaClock,
  FaEdit,
  FaTrash,
  FaExclamationTriangle,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";

const FollowupList = ({
  followups,
  onEditFollowup,
  onDeleteFollowup,
  onMarkCompleted,
  onSnooze,
}) => {
  const getTypeIcon = (type) => {
    const icons = {
      call: FaPhone,
      email: FaEnvelope,
      meeting: FaVideo,
      whatsapp: FaWhatsapp,
    };
    const Icon = icons[type] || FaClock;
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

  const getPriorityBadge = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[priority]}`}
      >
        {priority === "high" && (
          <FaExclamationTriangle className="h-3 w-3 mr-1" />
        )}
        {priority}
      </span>
    );
  };

  const getStatusBadge = (status, dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);

    let actualStatus = status;
    if (status === "pending" && due < now) {
      actualStatus = "overdue";
    }

    const colors = {
      pending: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      overdue: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      completed:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };

    const icons = {
      pending: FaClock,
      overdue: FaExclamationTriangle,
      completed: FaCheck,
    };

    const Icon = icons[actualStatus] || FaClock;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[actualStatus]}`}
      >
        <Icon className="h-3 w-3 mr-1" />
        {actualStatus}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return (
        date.toLocaleDateString() +
        ", " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }
  };

  const isOverdue = (dueDate, status) => {
    if (status === "completed") return false;
    const now = new Date();
    return new Date(dueDate) < now;
  };

  if (followups.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <FaClock className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No follow-ups found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your search filters or add a new follow-up.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {followups.map((followup) => {
        const overdue = isOverdue(followup.dueDate, followup.status);

        return (
          <div
            key={followup.id}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border transition duration-200 ${
              overdue
                ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10"
                : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
            }`}
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Left Section - Client and Follow-up Details */}
                <div className="flex-1">
                  <div className="flex items-start space-x-4">
                    {/* Client Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {followup.client.avatar}
                      </div>
                    </div>

                    {/* Follow-up Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {followup.client.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {followup.client.company}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3">
                          {/* Type Badge */}
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                              followup.type
                            )}`}
                          >
                            {getTypeIcon(followup.type)}
                            <span className="ml-1.5 capitalize">
                              {followup.type}
                            </span>
                          </span>

                          {/* Priority Badge */}
                          {getPriorityBadge(followup.priority)}

                          {/* Status Badge */}
                          {getStatusBadge(followup.status, followup.dueDate)}
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                        {followup.title}
                      </h4>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {followup.description}
                      </p>

                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <FaCalendarAlt className="h-3 w-3" />
                          <span>{formatDate(followup.dueDate)}</span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <FaUser className="h-3 w-3" />
                          <span>Assigned to: {followup.assignedTo}</span>
                        </div>

                        {followup.reminderSent && (
                          <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                            <FaCheck className="h-3 w-3" />
                            <span>Reminder sent</span>
                          </div>
                        )}
                      </div>

                      {/* Notes */}
                      {followup.notes && (
                        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            <strong>Notes:</strong> {followup.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Section - Actions */}
                <div className="flex flex-col items-end space-y-3">
                  {/* Due Date */}
                  <div className="text-right">
                    <div
                      className={`text-sm font-medium ${
                        overdue
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {formatDate(followup.dueDate)}
                    </div>
                    {overdue && (
                      <div className="text-xs text-red-500 dark:text-red-400">
                        Overdue
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    {followup.status !== "completed" && (
                      <>
                        <button
                          onClick={() => onMarkCompleted(followup.id)}
                          className="flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200 text-sm"
                        >
                          <FaCheck className="h-3 w-3" />
                          <span>Complete</span>
                        </button>

                        <button
                          onClick={() => onSnooze(followup.id, 1)}
                          className="flex items-center space-x-2 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition duration-200 text-sm"
                        >
                          <FaClock className="h-3 w-3" />
                          <span>Snooze 1d</span>
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => onEditFollowup(followup)}
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 text-sm"
                    >
                      <FaEdit className="h-3 w-3" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => onDeleteFollowup(followup.id)}
                      className="flex items-center space-x-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200 text-sm"
                    >
                      <FaTrash className="h-3 w-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FollowupList;
