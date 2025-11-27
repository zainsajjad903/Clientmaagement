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

import { toast } from "react-toastify";

// 🔹 Firebase imports
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

// Import components we'll create
import FollowupStats from "../components/Followups/FollowupStats";
import FollowupFilters from "../components/Followups/FollowupFilters";
import FollowupList from "../components/Followups/FollowupList";
import FollowupForm from "../components/Followups/FollowupForm";

// 🔹 Firestore collection references
const followupsCollectionRef = collection(db, "followups");
const clientsCollectionRef = collection(db, "clients");

const Followups = () => {
  const [followups, setFollowups] = useState([]);
  const [clients, setClients] = useState([]); // 🔹 clients from DB
  const [loading, setLoading] = useState(true);
  const [showFollowupForm, setShowFollowupForm] = useState(false);
  const [editingFollowup, setEditingFollowup] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "all",
    type: "all",
    dateRange: "all",
  });

  //  Realtime listener for follow-ups (replaces mock data)
  useEffect(() => {
    const toastId = toast.loading("Loading follow-ups...");

    const unsubscribe = onSnapshot(
      followupsCollectionRef,
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        console.log("Realtime follow-ups from Firestore:", data);
        setFollowups(data);
        setLoading(false);
        toast.dismiss(toastId);
        toast.success(`${data.length} follow-ups loaded successfully!`);
      },
      (error) => {
        console.error("onSnapshot error (followups):", error);
        setLoading(false);
        toast.dismiss(toastId);
        toast.error(`Failed to load follow-ups: ${error.message}`);
      }
    );

    return () => unsubscribe();
  }, []);

  // 🔹 Realtime listener for clients (same as Clients/Communication pages)
  useEffect(() => {
    const unsubscribe = onSnapshot(
      clientsCollectionRef,
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        console.log("Realtime clients for Followups page:", data);
        setClients(data);
      },
      (error) => {
        console.error("onSnapshot error (clients):", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // 🔹 Add new follow-up (save to Firestore)
  const handleAddFollowup = async (followupData) => {
    try {
      await addDoc(followupsCollectionRef, {
        ...followupData,
        status: "pending",
        createdAt: serverTimestamp(),
        reminderSent: false,
      });

      setShowFollowupForm(false);
      toast.success(
        `Follow-up with ${
          followupData.client?.name || "client"
        } scheduled successfully!`
      );
    } catch (error) {
      console.error("Error adding follow-up:", error);
      toast.error(`Failed to add follow-up: ${error.message}`);
    }
  };

  // 🔹 Update follow-up (Firestore)
  const handleUpdateFollowup = async (followupData) => {
    if (!editingFollowup) return;

    try {
      const ref = doc(db, "followups", editingFollowup.id);
      await updateDoc(ref, {
        ...followupData,
        updatedAt: serverTimestamp(),
      });

      setEditingFollowup(null);
      setShowFollowupForm(false);
      toast.success("Follow-up updated successfully!");
    } catch (error) {
      console.error("Error updating follow-up:", error);
      toast.error(`Failed to update follow-up: ${error.message}`);
    }
  };

  // 🔹 Delete follow-up (Firestore)
  const handleDeleteFollowup = (followupId) => {
    const followupToDelete = followups.find((f) => f.id === followupId);

    const confirmDelete = async () => {
      try {
        await deleteDoc(doc(db, "followups", followupId));
        toast.success(`Follow-up deleted successfully!`);
      } catch (error) {
        console.error("Error deleting follow-up:", error);
        toast.error(`Failed to delete follow-up: ${error.message}`);
      }
    };

    toast.info(
      <div className="p-4">
        <div className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Delete Follow-up?
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Are you sure you want to delete the follow-up with{" "}
          {followupToDelete?.client?.name || "unknown client"}?
        </p>
        <div className="flex space-x-3 justify-end">
          <button
            onClick={async () => {
              toast.dismiss();
              await confirmDelete();
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

  // 🔹 Mark as completed (Firestore)
  const handleMarkCompleted = async (followupId) => {
    const followup = followups.find((f) => f.id === followupId);
    if (!followup) return;

    try {
      const ref = doc(db, "followups", followupId);
      await updateDoc(ref, {
        status: "completed",
        completedAt: serverTimestamp(),
      });

      toast.success(
        `Follow-up with ${
          followup.client?.name || "client"
        } marked as completed!`
      );
    } catch (error) {
      console.error("Error marking follow-up completed:", error);
      toast.error(`Failed to update follow-up: ${error.message}`);
    }
  };

  // 🔹 Snooze follow-up (Firestore)
  const handleSnooze = async (followupId, days = 1) => {
    const followup = followups.find((f) => f.id === followupId);
    if (!followup || !followup.dueDate) return;

    let baseDate;
    if (followup.dueDate.seconds) {
      baseDate = new Date(followup.dueDate.seconds * 1000);
    } else {
      baseDate = new Date(followup.dueDate);
    }

    if (isNaN(baseDate.getTime())) return;

    baseDate.setDate(baseDate.getDate() + days);

    try {
      const ref = doc(db, "followups", followupId);
      await updateDoc(ref, {
        dueDate: baseDate.toISOString(),
        reminderSent: false,
      });

      toast.info(
        `Follow-up with ${
          followup.client?.name || "client"
        } snoozed for ${days} day(s)`
      );
    } catch (error) {
      console.error("Error snoozing follow-up:", error);
      toast.error(`Failed to snooze follow-up: ${error.message}`);
    }
  };

  // 🔹 Filter follow-ups with safe access (and Timestamp support)
  const filteredFollowups = followups.filter((followup) => {
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

    let matchesDate = true;

    if (followup.dueDate) {
      let dueDate;
      if (followup.dueDate.seconds) {
        dueDate = new Date(followup.dueDate.seconds * 1000);
      } else {
        dueDate = new Date(followup.dueDate);
      }

      if (!isNaN(dueDate.getTime())) {
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
          clients={clients} // 🔹 same clients as Clients/Communication
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
