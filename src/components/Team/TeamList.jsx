// src/components/Team/TeamList.jsx
import {
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaTrash,
  FaUserShield,
  FaUserCheck,
  FaUserClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";

const TeamList = ({
  members,
  onEditMember,
  onDeleteMember,
  onResendInvitation,
}) => {
  const getRoleIcon = (role) => {
    const icons = {
      admin: FaUserShield,
      manager: FaChartLine,
      member: FaUserCheck,
      viewer: FaUserClock,
    };
    return icons[role] || FaUserCheck;
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      manager:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      member: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      viewer: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  const getStatusBadge = (status) => {
    const colors = {
      active:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      inactive: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}
      >
        {status === "active" && <FaUserCheck className="h-3 w-3 mr-1" />}
        {status === "pending" && <FaUserClock className="h-3 w-3 mr-1" />}
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (members.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <FaUserCheck className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No team members found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your search filters or invite new team members.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                Team Member
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                Contact
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                Role & Status
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                Performance
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Active
              </th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {members.map((member) => {
              const RoleIcon = getRoleIcon(member.role);

              return (
                <tr
                  key={member.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-200"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {member.avatar}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {member.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {member.department}
                        </p>
                        <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <FaMapMarkerAlt className="h-3 w-3" />
                          <span>{member.location}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-900 dark:text-white">
                        <FaEnvelope className="h-3 w-3 text-gray-400" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <FaPhone className="h-3 w-3 text-gray-400" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
                          member.role
                        )}`}
                      >
                        <RoleIcon className="h-3 w-3 mr-1" />
                        {member.role}
                      </span>
                      {getStatusBadge(member.status)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Clients:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {member.assignedClients}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Projects:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {member.completedProjects}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <FaCalendarAlt className="h-3 w-3" />
                      <span>{formatDate(member.lastActive)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-end space-x-2">
                      {member.status === "pending" && (
                        <button
                          onClick={() => onResendInvitation(member)}
                          className="flex items-center space-x-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition duration-200 text-sm"
                        >
                          <FaEnvelope className="h-3 w-3" />
                          <span>Resend</span>
                        </button>
                      )}
                      <button
                        onClick={() => onEditMember(member)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition duration-200"
                        title="Edit"
                      >
                        <FaEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDeleteMember(member.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition duration-200"
                        title="Remove"
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {members.map((member) => {
            const RoleIcon = getRoleIcon(member.role);

            return (
              <div
                key={member.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {member.avatar}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                          {member.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {member.department}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0 space-y-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
                            member.role
                          )}`}
                        >
                          <RoleIcon className="h-3 w-3 mr-1" />
                          {member.role}
                        </span>
                        {getStatusBadge(member.status)}
                      </div>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <FaEnvelope className="h-3 w-3" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaMapMarkerAlt className="h-3 w-3" />
                          <span>{member.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">
                            Clients:{" "}
                          </span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {member.assignedClients}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">
                            Projects:{" "}
                          </span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {member.completedProjects}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt className="h-3 w-3" />
                        <span>
                          Last active: {formatDate(member.lastActive)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end space-x-3">
                      {member.status === "pending" && (
                        <button
                          onClick={() => onResendInvitation(member)}
                          className="flex items-center space-x-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition duration-200 text-sm"
                        >
                          <FaEnvelope className="h-3 w-3" />
                          <span>Resend</span>
                        </button>
                      )}
                      <button
                        onClick={() => onEditMember(member)}
                        className="flex items-center space-x-1 px-3 py-1.5 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition duration-200 text-sm"
                      >
                        <FaEdit className="h-3 w-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => onDeleteMember(member.id)}
                        className="flex items-center space-x-1 px-3 py-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition duration-200 text-sm"
                      >
                        <FaTrash className="h-3 w-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamList;
