// components/Clients/ClientTable.jsx
import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaCheckSquare,
  FaSquare,
} from "react-icons/fa";

const ClientTable = ({
  clients,
  selectedClients,
  onSelectClient,
  onEditClient,
  onDeleteClient,
}) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      onSelectClient([]);
    } else {
      onSelectClient(clients.map((client) => client.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectClient = (clientId) => {
    if (selectedClients.includes(clientId)) {
      onSelectClient(selectedClients.filter((id) => id !== clientId));
    } else {
      onSelectClient([...selectedClients, clientId]);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        color:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        label: "Active",
      },
      lead: {
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        label: "Lead",
      },
      inactive: {
        color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
        label: "Inactive",
      },
    };

    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const getPlatformBadge = (platform) => {
    const platformColors = {
      Upwork:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Fiverr: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Freelancer:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      Direct: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      LinkedIn: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Referral:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
          platformColors[platform] || platformColors.Direct
        }`}
      >
        {platform}
      </span>
    );
  };

  // ✅ Safe date formatter (handles "", undefined, invalid, Firestore Timestamp)
  const formatFollowUpDate = (value) => {
    if (!value) return { label: "-", tag: "" };

    let date;

    // Firestore Timestamp case
    if (value.seconds) {
      date = new Date(value.seconds * 1000);
    } else {
      date = new Date(value);
    }

    if (isNaN(date.getTime())) {
      return { label: "-", tag: "" };
    }

    const label = date.toLocaleDateString();
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    return { label, tag: isToday ? "Today" : "" };
  };

  if (clients.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <FaEye className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No clients found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your search filters or add a new client.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-8"
              >
                <button
                  onClick={handleSelectAll}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {selectAll ? (
                    <FaCheckSquare className="h-4 w-4" />
                  ) : (
                    <FaSquare className="h-4 w-4" />
                  )}
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Client
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Contact
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Platform
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Project
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Next Follow-up
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {clients.map((client) => {
              const { label: followUpLabel, tag: followUpTag } =
                formatFollowUpDate(client.nextFollowUp);

              return (
                <tr
                  key={client.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleSelectClient(client.id)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {selectedClients.includes(client.id) ? (
                        <FaCheckSquare className="h-4 w-4" />
                      ) : (
                        <FaSquare className="h-4 w-4" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {client.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {client.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {client.company}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {client.email}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {client.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPlatformBadge(client.platform)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(client.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {client.projectType}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {client.budget}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {followUpLabel}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {followUpTag}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {/* Communication Buttons */}
                      <button
                        onClick={() =>
                          window.open(`tel:${client.phone}`, "_blank")
                        }
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded transition duration-150"
                        title="Call"
                      >
                        <FaPhone className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          window.open(`mailto:${client.email}`, "_blank")
                        }
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1 rounded transition duration-150"
                        title="Email"
                      >
                        <FaEnvelope className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            `https://wa.me/${client.phone.replace(/\D/g, "")}`,
                            "_blank"
                          )
                        }
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1 rounded transition duration-150"
                        title="WhatsApp"
                      >
                        <FaWhatsapp className="h-4 w-4" />
                      </button>

                      {/* Action Buttons */}
                      <button
                        onClick={() => onEditClient(client)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded transition duration-150"
                        title="Edit"
                      >
                        <FaEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDeleteClient(client.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded transition duration-150"
                        title="Delete"
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
    </div>
  );
};

export default ClientTable;
