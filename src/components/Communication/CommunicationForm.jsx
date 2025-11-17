// src/components/Communication/CommunicationForm.jsx
import { useState, useEffect } from "react";
import { FaTimes, FaSave, FaPaperclip, FaUser } from "react-icons/fa";

const CommunicationForm = ({ client, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    clientId: "",
    type: "call",
    subject: "",
    summary: "",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().slice(0, 5),
    duration: "",
    status: "completed",
    followUpRequired: false,
    followUpDate: "",
    participants: [],
    notes: "",
    files: [],
  });

  const [errors, setErrors] = useState({});
  const [newParticipant, setNewParticipant] = useState("");

  // Mock clients - replace with actual data
  const clients = [
    { id: 1, name: "Sarah Johnson", company: "TechCorp Inc" },
    { id: 2, name: "Mike Thompson", company: "Design Studio LLC" },
    { id: 3, name: "Emily Davis", company: "Startup Innovations" },
    { id: 4, name: "Robert Wilson", company: "Business Consulting Co" },
    { id: 5, name: "Lisa Chen", company: "Digital Agency Partners" },
  ];

  useEffect(() => {
    if (client) {
      setFormData((prev) => ({
        ...prev,
        clientId: client.id.toString(),
      }));
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAddParticipant = () => {
    if (
      newParticipant.trim() &&
      !formData.participants.includes(newParticipant.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        participants: [...prev.participants, newParticipant.trim()],
      }));
      setNewParticipant("");
    }
  };

  const handleRemoveParticipant = (participant) => {
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.filter((p) => p !== participant),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clientId) newErrors.clientId = "Client is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.summary.trim()) newErrors.summary = "Summary is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const selectedClient = clients.find(
        (c) => c.id.toString() === formData.clientId
      );
      onSave({
        ...formData,
        client: selectedClient,
        date: `${formData.date}T${formData.time}:00`,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 lg:p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] lg:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white truncate">
            Log Communication
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition duration-150 p-1"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="lg:col-span-2">
              <h3 className="text-base lg:text-lg font-medium text-gray-900 dark:text-white mb-4">
                Basic Information
              </h3>
            </div>

            {/* Client Selection */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Client *
              </label>
              <select
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                  errors.clientId
                    ? "border-red-300 dark:border-red-700"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              >
                <option value="">Select a client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name} - {client.company}
                  </option>
                ))}
              </select>
              {errors.clientId && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.clientId}
                </p>
              )}
            </div>

            {/* Communication Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Communication Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="call">Phone Call</option>
                <option value="email">Email</option>
                <option value="meeting">Meeting</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="completed">Completed</option>
                <option value="scheduled">Scheduled</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Date and Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 30 minutes"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Follow-up */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="followUpRequired"
                checked={formData.followUpRequired}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Follow-up Required
              </label>
            </div>

            {formData.followUpRequired && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Follow-up Date
                </label>
                <input
                  type="date"
                  name="followUpDate"
                  value={formData.followUpDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            )}

            {/* Subject */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                  errors.subject
                    ? "border-red-300 dark:border-red-700"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="Brief subject of the communication"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Summary */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Summary *
              </label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                  errors.summary
                    ? "border-red-300 dark:border-red-700"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="Detailed summary of the communication..."
              />
              {errors.summary && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.summary}
                </p>
              )}
            </div>

            {/* Participants */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Participants
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newParticipant}
                  onChange={(e) => setNewParticipant(e.target.value)}
                  placeholder="Add participant"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleAddParticipant}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 text-sm"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.participants.map((participant, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                  >
                    <FaUser className="h-3 w-3 mr-1" />
                    {participant}
                    <button
                      type="button"
                      onClick={() => handleRemoveParticipant(participant)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Any additional notes or important points..."
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse xs:flex-row xs:items-center xs:justify-end gap-3 mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="w-full xs:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full xs:w-auto flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
            >
              <FaSave className="h-4 w-4" />
              <span>Save Communication</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunicationForm;
