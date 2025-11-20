// src/pages/Followups.jsx
import { useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaCheck,
  FaClock,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaEdit,
  FaTrash,
  FaDownload,
} from "react-icons/fa";

// Import components we'll create
import FollowupStats from "../components/Followups/FollowupStats";
import FollowupFilters from "../components/Followups/FollowupFilters";
import FollowupList from "../components/Followups/FollowupList";
import FollowupForm from "../components/Followups/FollowupForm";
import { toast } from "react-toastify";

const Followups = () => {
  const [followups, setFollowups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFollowupForm, setShowFollowupForm] = useState(false);
  const [editingFollowup, setEditingFollowup] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "all",
    type: "all",
    dateRange: "today",
  });

  // Mock data - replace with API calls
  useEffect(() => {
    const mockFollowups = [
      {
        id: 1,
        client: {
          id: 1,
          name: "Sarah Johnson",
          company: "TechCorp Inc",
          avatar: "SJ",
        },
        type: "call",
        title: "Project Update Discussion",
        description: "Discuss the latest project milestones and next steps",
        dueDate: "2024-01-15T14:30:00",
        priority: "high",
        status: "pending",
        assignedTo: "John Doe",
        createdAt: "2024-01-10T09:00:00",
        notes: "Client waiting for budget approval",
        reminderSent: false,
      },
      {
        id: 2,
        client: {
          id: 2,
          name: "Mike Thompson",
          company: "Design Studio LLC",
          avatar: "MT",
        },
        type: "email",
        title: "Proposal Follow-up",
        description: "Follow up on the proposal sent last week",
        dueDate: "2024-01-14T10:00:00",
        priority: "medium",
        status: "overdue",
        assignedTo: "Jane Smith",
        createdAt: "2024-01-07T14:20:00",
        notes: "Client mentioned they'll review by Friday",
        reminderSent: true,
      },
      {
        id: 3,
        client: {
          id: 3,
          name: "Emily Davis",
          company: "Startup Innovations",
          avatar: "ED",
        },
        type: "meeting",
        title: "Contract Review",
        description: "Review and sign the service agreement",
        dueDate: "2024-01-18T15:00:00",
        priority: "high",
        status: "pending",
        assignedTo: "John Doe",
        createdAt: "2024-01-12T11:30:00",
        notes: "Legal team has approved the terms",
        reminderSent: false,
      },
      {
        id: 4,
        client: {
          id: 4,
          name: "Robert Wilson",
          company: "Business Consulting Co",
          avatar: "RW",
        },
        type: "whatsapp",
        title: "Quick Check-in",
        description: "Check if they received the deliverables",
        dueDate: "2024-01-16T16:00:00",
        priority: "low",
        status: "pending",
        assignedTo: "Jane Smith",
        createdAt: "2024-01-13T08:45:00",
        notes: "Client usually responds quickly on WhatsApp",
        reminderSent: false,
      },
      {
        id: 5,
        client: {
          id: 5,
          name: "Lisa Chen",
          company: "Digital Agency Partners",
          avatar: "LC",
        },
        type: "call",
        title: "Emergency Bug Discussion",
        description: "Discuss critical bug found in production",
        dueDate: "2024-01-11T18:00:00",
        priority: "high",
        status: "completed",
        assignedTo: "John Doe",
        createdAt: "2024-01-11T16:30:00",
        notes: "Issue resolved successfully",
        reminderSent: true,
        completedAt: "2024-01-11T18:45:00",
      },
    ];

    setTimeout(() => {
      setFollowups(mockFollowups);
      setLoading(false);
    }, 1000);
  }, []);

  // Add new follow-up
  const handleAddFollowup = (followupData) => {
    const newFollowup = {
      id: Date.now(), // Use timestamp for unique ID
      ...followupData,
      status: "pending",
      createdAt: new Date().toISOString(),
      reminderSent: false,
    };
    setFollowups([newFollowup, ...followups]);
    setShowFollowupForm(false);
    toast.success(
      `Follow-up with ${
        followupData.client?.name || "client"
      } scheduled successfully!`
    );
  };

  // Update follow-up
  const handleUpdateFollowup = (followupData) => {
    setFollowups(
      followups.map((followup) =>
        followup.id === editingFollowup.id
          ? {
              ...followup,
              ...followupData,
              updatedAt: new Date().toISOString(),
            }
          : followup
      )
    );
    setEditingFollowup(null);
    setShowFollowupForm(false);
    toast.success("Follow-up updated successfully!");
  };

  // Delete follow-up
  const handleDeleteFollowup = (followupId) => {
    const followupToDelete = followups.find((f) => f.id === followupId);

    // Custom confirmation toast
    const confirmDelete = () => {
      setFollowups(followups.filter((followup) => followup.id !== followupId));
      toast.success(`Follow-up deleted successfully!`);
    };

    toast.info(
      <div className="p-4">
        <div className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Delete Follow-up?
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Are you sure you want to delete the follow-up with{" "}
          {followupToDelete.client?.name || "unknown client"}?
        </p>
        <div className="flex space-x-3 justify-end">
          <button
            onClick={() => {
              toast.dismiss();
              confirmDelete();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  // Mark as completed
  const handleMarkCompleted = (followupId) => {
    setFollowups(
      followups.map((followup) =>
        followup.id === followupId
          ? {
              ...followup,
              status: "completed",
              completedAt: new Date().toISOString(),
            }
          : followup
      )
    );
    const followup = followups.find((f) => f.id === followupId);
    toast.success(
      `Follow-up with ${followup.client?.name || "client"} marked as completed!`
    );
  };

  // Snooze follow-up
  const handleSnooze = (followupId, days = 1) => {
    setFollowups(
      followups.map((followup) => {
        if (followup.id === followupId) {
          const newDate = new Date(followup.dueDate);
          newDate.setDate(newDate.getDate() + days);
          return {
            ...followup,
            dueDate: newDate.toISOString(),
            reminderSent: false,
          };
        }
        return followup;
      })
    );
    const followup = followups.find((f) => f.id === followupId);
    toast.info(
      `Follow-up with ${
        followup.client?.name || "client"
      } snoozed for ${days} day(s)`
    );
  };

  // Filter follow-ups with safe access
  const filteredFollowups = followups.filter((followup) => {
    // Safe access to client properties
    const clientName = followup.client?.name || "";
    const title = followup.title || "";
    const description = followup.description || "";

    const matchesSearch =
      clientName.toLowerCase().includes(filters.search.toLowerCase()) ||
      title.toLowerCase().includes(filters.search.toLowerCase()) ||
      description.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus =
      filters.status === "all" || followup.status === filters.status;
    const matchesPriority =
      filters.priority === "all" || followup.priority === filters.priority;
    const matchesType =
      filters.type === "all" || followup.type === filters.type;

    // Date filtering with safe date handling
    let matchesDate = true;
    if (followup.dueDate) {
      const dueDate = new Date(followup.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (filters.dateRange === "today") {
        matchesDate = dueDate.toDateString() === today.toDateString();
      } else if (filters.dateRange === "overdue") {
        matchesDate = dueDate < today && followup.status !== "completed";
      } else if (filters.dateRange === "upcoming") {
        matchesDate = dueDate > today && followup.status !== "completed";
      }
    }

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesType &&
      matchesDate
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
              Follow-up System
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage client follow-ups and reminders - {followups.length} total
              follow-ups
            </p>
          </div>

          <div className="flex flex-col xs:flex-row gap-3">
            <button className="flex items-center justify-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200 min-w-[120px]">
              <FaDownload className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Export</span>
            </button>

            <button
              onClick={() => setShowFollowupForm(true)}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 min-w-[120px]"
            >
              <FaPlus className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Add Follow-up</span>
            </button>
          </div>
        </div>
      </div>

      {/* Follow-up Statistics */}
      <FollowupStats followups={followups} />

      {/* Filters Section */}
      <FollowupFilters filters={filters} onFiltersChange={setFilters} />

      {/* Follow-up List */}
      <FollowupList
        followups={filteredFollowups}
        onEditFollowup={(followup) => {
          setEditingFollowup(followup);
          setShowFollowupForm(true);
        }}
        onDeleteFollowup={handleDeleteFollowup}
        onMarkCompleted={handleMarkCompleted}
        onSnooze={handleSnooze}
      />

      {/* Follow-up Form Modal */}
      {showFollowupForm && (
        <FollowupForm
          followup={editingFollowup}
          onSave={editingFollowup ? handleUpdateFollowup : handleAddFollowup}
          onClose={() => {
            setShowFollowupForm(false);
            setEditingFollowup(null);
          }}
        />
      )}
    </div>
  );
};

export default Followups;
