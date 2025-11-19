// src/components/Followups/FollowupForm.jsx
import { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaStickyNote,
  FaPhone,
  FaEnvelope,
  FaVideo,
  FaWhatsapp,
  FaTasks,
  FaExclamationTriangle,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const FollowupForm = ({ followup, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "call",
    priority: "medium",
    dueDate: "",
    dueTime: "",
    assignedTo: "",
    notes: "",
    status: "pending",
    client: {
      id: "",
      name: "",
      company: "",
      avatar: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock clients data
  const clients = [
    { id: 1, name: "Sarah Johnson", company: "TechCorp Inc", avatar: "SJ" },
    {
      id: 2,
      name: "Mike Thompson",
      company: "Design Studio LLC",
      avatar: "MT",
    },
    {
      id: 3,
      name: "Emily Davis",
      company: "Startup Innovations",
      avatar: "ED",
    },
    {
      id: 4,
      name: "Robert Wilson",
      company: "Business Consulting Co",
      avatar: "RW",
    },
    {
      id: 5,
      name: "Lisa Chen",
      company: "Digital Agency Partners",
      avatar: "LC",
    },
  ];

  const teamMembers = [
    { id: "john", name: "John Doe" },
    { id: "jane", name: "Jane Smith" },
  ];

  // Initialize form with followup data if editing
  useEffect(() => {
    if (followup) {
      const dueDate = new Date(followup.dueDate);
      setFormData({
        title: followup.title || "",
        description: followup.description || "",
        type: followup.type || "call",
        priority: followup.priority || "medium",
        dueDate: dueDate.toISOString().split("T")[0],
        dueTime: dueDate.toTimeString().slice(0, 5),
        assignedTo: followup.assignedTo || "",
        notes: followup.notes || "",
        status: followup.status || "pending",
        client: followup.client || {
          id: "",
          name: "",
          company: "",
          avatar: "",
        },
      });
    } else {
      // Set default values for new followup
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      setFormData((prev) => ({
        ...prev,
        dueDate: tomorrow.toISOString().split("T")[0],
        dueTime: "09:00",
        client: clients[0] || { id: "", name: "", company: "", avatar: "" },
      }));
    }
  }, [followup]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleClientChange = (e) => {
    const clientId = e.target.value;
    const selectedClient = clients.find(
      (client) => client.id === parseInt(clientId)
    );

    if (selectedClient) {
      setFormData((prev) => ({
        ...prev,
        client: selectedClient,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.client.id) {
      newErrors.client = "Please select a client";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    } else {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.dueDate = "Due date cannot be in the past";
      }
    }

    if (!formData.dueTime) {
      newErrors.dueTime = "Due time is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Combine date and time
      const dueDateTime = new Date(`${formData.dueDate}T${formData.dueTime}`);

      const followupData = {
        ...formData,
        dueDate: dueDateTime.toISOString(),
        // Remove the client object and use the structure your Followups page expects
        client: {
          id: formData.client.id,
          name: formData.client.name,
          company: formData.client.company,
          avatar: formData.client.avatar,
        },
        // Add fields that your Followups page expects
        id: followup ? followup.id : Date.now(), // Use simple ID
        reminderSent: false,
        createdAt: followup ? followup.createdAt : new Date().toISOString(),
      };

      // Remove the client nested object if it's causing issues
      const { client, ...submitData } = followupData;
      const finalData = {
        ...submitData,
        ...client, // Flatten client properties
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Call save function - pass the properly structured data
      onSave(finalData);
    } catch (error) {
      console.error("Error saving follow-up:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FaCalendarAlt className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {followup ? "Edit Follow-up" : "Schedule New Follow-up"}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {followup
                  ? "Update follow-up details"
                  : "Create a new client follow-up"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-200"
          >
            <FaTimes className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Client Selection */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <FaUser className="h-4 w-4" />
              <span>Client *</span>
            </label>
            <select
              value={formData.client.id}
              onChange={handleClientChange}
              className={`w-full bg-white dark:bg-gray-700 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.client
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name} - {client.company}
                </option>
              ))}
            </select>
            {errors.client && (
              <p className="text-red-500 text-sm flex items-center space-x-1">
                <FaExclamationTriangle className="h-3 w-3" />
                <span>{errors.client}</span>
              </p>
            )}
          </div>

          {/* Title and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter follow-up title"
                className={`w-full bg-white dark:bg-gray-700 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <FaExclamationTriangle className="h-3 w-3" />
                  <span>{errors.title}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="call">Phone Call</option>
                <option value="email">Email</option>
                <option value="meeting">Meeting</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="task">Task</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              placeholder="Describe the purpose of this follow-up..."
              className={`w-full bg-white dark:bg-gray-700 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm flex items-center space-x-1">
                <FaExclamationTriangle className="h-3 w-3" />
                <span>{errors.description}</span>
              </p>
            )}
          </div>

          {/* Due Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaCalendarAlt className="h-4 w-4" />
                <span>Due Date *</span>
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full bg-white dark:bg-gray-700 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.dueDate
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.dueDate && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <FaExclamationTriangle className="h-3 w-3" />
                  <span>{errors.dueDate}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaClock className="h-4 w-4" />
                <span>Due Time *</span>
              </label>
              <input
                type="time"
                name="dueTime"
                value={formData.dueTime}
                onChange={handleInputChange}
                className={`w-full bg-white dark:bg-gray-700 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.dueTime
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.dueTime && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <FaExclamationTriangle className="h-3 w-3" />
                  <span>{errors.dueTime}</span>
                </p>
              )}
            </div>
          </div>

          {/* Priority and Assigned To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaUser className="h-4 w-4" />
                <span>Assigned To</span>
              </label>
              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Unassigned</option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <FaStickyNote className="h-4 w-4" />
              <span>Additional Notes</span>
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="3"
              placeholder="Add any additional notes or context..."
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition duration-200"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaCheck className="h-4 w-4" />
                  <span>
                    {followup ? "Update Follow-up" : "Create Follow-up"}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FollowupForm;
