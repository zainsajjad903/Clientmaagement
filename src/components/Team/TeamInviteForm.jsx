// src/components/Team/TeamInviteForm.jsx
import { useState, useEffect } from "react";
import {
  FaTimes,
  FaEnvelope,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaUserShield,
  FaUserCheck,
  FaUserClock,
  FaChartLine,
  FaBuilding,
} from "react-icons/fa";

const TeamInviteForm = ({ member, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "member",
    department: "",
    location: "",
    permissions: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Role options
  const roles = [
    {
      value: "admin",
      label: "Administrator",
      description: "Full access to all features and settings",
      icon: FaUserShield,
      color: "text-red-600",
    },
    {
      value: "manager",
      label: "Manager",
      description: "Manage clients, projects, and team members",
      icon: FaChartLine,
      color: "text-purple-600",
    },
    {
      value: "member",
      label: "Team Member",
      description: "Access to assigned clients and projects",
      icon: FaUserCheck,
      color: "text-blue-600",
    },
    {
      value: "viewer",
      label: "Viewer",
      description: "Read-only access to view data",
      icon: FaUserClock,
      color: "text-gray-600",
    },
  ];

  // Department options
  const departments = [
    "Management",
    "Sales",
    "Development",
    "Design",
    "Marketing",
    "Support",
    "Operations",
    "Finance",
  ];

  // Location options
  const locations = [
    "Remote",
    "New York, USA",
    "Chicago, USA",
    "Los Angeles, USA",
    "Boston, USA",
    "London, UK",
    "Toronto, Canada",
    "Sydney, Australia",
  ];

  // Permission options based on role
  const permissionOptions = {
    admin: [
      {
        value: "all",
        label: "All Permissions",
        description: "Full system access",
      },
    ],
    manager: [
      {
        value: "clients",
        label: "Manage Clients",
        description: "Add, edit, and delete clients",
      },
      {
        value: "projects",
        label: "Manage Projects",
        description: "Create and manage projects",
      },
      {
        value: "team",
        label: "Manage Team",
        description: "View and assign team members",
      },
      {
        value: "reports",
        label: "View Reports",
        description: "Access analytics and reports",
      },
    ],
    member: [
      {
        value: "clients",
        label: "Manage Clients",
        description: "Add, edit assigned clients",
      },
      {
        value: "projects",
        label: "Manage Projects",
        description: "Work on assigned projects",
      },
      {
        value: "communications",
        label: "Client Communications",
        description: "Log calls and emails",
      },
    ],
    viewer: [
      {
        value: "view_clients",
        label: "View Clients",
        description: "Read-only client access",
      },
      {
        value: "view_projects",
        label: "View Projects",
        description: "Read-only project access",
      },
      {
        value: "view_reports",
        label: "View Reports",
        description: "Read-only report access",
      },
    ],
  };

  // Initialize form with member data if editing
  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || "",
        email: member.email || "",
        phone: member.phone || "",
        role: member.role || "member",
        department: member.department || "",
        location: member.location || "",
        permissions: member.permissions || [],
      });
    } else {
      // Set default values for new member
      setFormData((prev) => ({
        ...prev,
        role: "member",
        department: departments[0] || "",
        location: locations[0] || "",
      }));
    }
  }, [member]);

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

    // Reset permissions when role changes
    if (name === "role") {
      setFormData((prev) => ({
        ...prev,
        permissions: [],
      }));
    }
  };

  const handlePermissionChange = (permission, checked) => {
    if (checked) {
      if (permission === "all") {
        // If "all" is selected, set all permissions for the role
        setFormData((prev) => ({
          ...prev,
          permissions: permissionOptions[prev.role].map((p) => p.value),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          permissions: [...prev.permissions, permission],
        }));
      }
    } else {
      if (permission === "all") {
        // If "all" is deselected, clear all permissions
        setFormData((prev) => ({
          ...prev,
          permissions: [],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          permissions: prev.permissions.filter((p) => p !== permission),
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    if (!formData.location) {
      newErrors.location = "Location is required";
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
      const memberData = {
        ...formData,
        // Add fields that your Team page expects
        id: member ? member.id : Date.now(),
        status: member ? member.status : "pending",
        avatar: formData.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
        joinDate: member
          ? member.joinDate
          : new Date().toISOString().split("T")[0],
        lastActive: member ? member.lastActive : new Date().toISOString(),
        assignedClients: member ? member.assignedClients : 0,
        completedProjects: member ? member.completedProjects : 0,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Call save function
      onSave(memberData);
    } catch (error) {
      console.error("Error saving team member:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentPermissions = () => {
    return permissionOptions[formData.role] || [];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FaEnvelope className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {member ? "Edit Team Member" : "Invite Team Member"}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {member
                  ? "Update team member details"
                  : "Send invitation to join your team"}
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
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaUser className="h-4 w-4" />
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter team member's name"
                className={`w-full bg-white dark:bg-gray-700 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <FaTimes className="h-3 w-3" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaEnvelope className="h-4 w-4" />
                <span>Email Address *</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className={`w-full bg-white dark:bg-gray-700 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <FaTimes className="h-3 w-3" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaPhone className="h-4 w-4" />
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaBuilding className="h-4 w-4" />
                <span>Department *</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={`w-full bg-white dark:bg-gray-700 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.department
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <FaTimes className="h-3 w-3" />
                  <span>{errors.department}</span>
                </p>
              )}
            </div>
          </div>

          {/* Location and Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaMapMarkerAlt className="h-4 w-4" />
                <span>Location *</span>
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full bg-white dark:bg-gray-700 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.location
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <option value="">Select Location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {errors.location && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <FaTimes className="h-3 w-3" />
                  <span>{errors.location}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Role Description */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-lg bg-opacity-10 ${roles
                  .find((r) => r.value === formData.role)
                  ?.color.replace("text-", "bg-")}`}
              >
                {(() => {
                  const RoleIcon =
                    roles.find((r) => r.value === formData.role)?.icon ||
                    FaUser;
                  return (
                    <RoleIcon
                      className={`h-4 w-4 ${
                        roles.find((r) => r.value === formData.role)?.color
                      }`}
                    />
                  );
                })()}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {roles.find((r) => r.value === formData.role)?.label}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {roles.find((r) => r.value === formData.role)?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Permissions
            </label>
            <div className="space-y-3">
              {getCurrentPermissions().map((permission) => (
                <label
                  key={permission.value}
                  className="flex items-start space-x-3"
                >
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission.value)}
                    onChange={(e) =>
                      handlePermissionChange(permission.value, e.target.checked)
                    }
                    className="mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {permission.label}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {permission.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
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
                  <span>{member ? "Updating..." : "Sending Invite..."}</span>
                </>
              ) : (
                <>
                  <FaEnvelope className="h-4 w-4" />
                  <span>{member ? "Update Member" : "Send Invitation"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamInviteForm;
