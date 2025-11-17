// src/pages/Communication.jsx
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaPhone,
  FaEnvelope,
  FaVideo,
  FaComment,
  FaWhatsapp,
  FaCalendar,
  FaDownload,
  FaPaperclip,
  FaUser,
  FaClock,
} from "react-icons/fa";

// Import components we'll create
import CommunicationStats from "../components/Communication/CommunicationStats";
import CommunicationFilters from "../components/Communication/CommunicationFilters";
import CommunicationLog from "../components/Communication/CommunicationLog";
import CommunicationForm from "../components/Communication/CommunicationForm";
import QuickActions from "../components/Communication/QuickActions";

const Communication = () => {
  const [communications, setCommunications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCommunicationForm, setShowCommunicationForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    client: "all",
    dateRange: "7days",
  });

  // Mock data - replace with API calls
  useEffect(() => {
    const mockCommunications = [
      {
        id: 1,
        client: {
          id: 1,
          name: "Sarah Johnson",
          company: "TechCorp Inc",
          avatar: "SJ",
        },
        type: "call",
        subject: "Project Kickoff Discussion",
        summary:
          "Discussed project requirements and timeline. Client provided initial feedback on the proposal.",
        date: "2024-01-15T14:30:00",
        duration: "30 minutes",
        status: "completed",
        followUpRequired: true,
        followUpDate: "2024-01-22",
        files: [],
        participants: ["John Doe", "Sarah Johnson"],
        notes:
          "Client seems excited about the project. Need to send updated proposal by Wednesday.",
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
        subject: "Proposal Feedback",
        summary:
          "Sent updated proposal and received positive feedback. Waiting for final confirmation.",
        date: "2024-01-14T10:15:00",
        duration: null,
        status: "completed",
        followUpRequired: true,
        followUpDate: "2024-01-18",
        files: ["proposal_v2.pdf"],
        participants: ["Jane Smith", "Mike Thompson"],
        notes: "Client requested minor changes to payment terms.",
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
        subject: "Design Review Session",
        summary:
          "Walked through the initial design mockups. Client provided detailed feedback on user experience.",
        date: "2024-01-13T15:45:00",
        duration: "45 minutes",
        status: "completed",
        followUpRequired: false,
        followUpDate: null,
        files: ["design_mockups.pdf", "feedback.docx"],
        participants: ["John Doe", "Emily Davis", "Design Team"],
        notes:
          "Client loved the overall direction. Need to incorporate feedback on mobile responsiveness.",
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
        subject: "Quick Update",
        summary:
          "Client confirmed receipt of deliverables and scheduled next review meeting.",
        date: "2024-01-12T09:20:00",
        duration: "5 minutes",
        status: "completed",
        followUpRequired: true,
        followUpDate: "2024-01-19",
        files: [],
        participants: ["Jane Smith", "Robert Wilson"],
        notes: "Client mentioned potential referral opportunity.",
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
        subject: "Emergency Bug Fix",
        summary:
          "Discussed critical bug in production environment. Coordinated immediate fix deployment.",
        date: "2024-01-11T18:30:00",
        duration: "25 minutes",
        status: "completed",
        followUpRequired: true,
        followUpDate: "2024-01-12",
        files: ["bug_report.pdf"],
        participants: ["John Doe", "Lisa Chen", "Dev Team"],
        notes:
          "Issue resolved. Need to follow up tomorrow to confirm stability.",
      },
    ];

    setTimeout(() => {
      setCommunications(mockCommunications);
      setLoading(false);
    }, 1000);
  }, []);

  // Add new communication
  const handleAddCommunication = (communicationData) => {
    const newCommunication = {
      id: communications.length + 1,
      ...communicationData,
      createdAt: new Date().toISOString(),
      addedBy: "Current User",
    };
    setCommunications([newCommunication, ...communications]);
    setShowCommunicationForm(false);
    setSelectedClient(null);
    toast.success("Communication logged successfully!");
  };

  // Filter communications
  const filteredCommunications = communications.filter((communication) => {
    const matchesSearch =
      communication.client.name
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      communication.subject
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      communication.summary
        .toLowerCase()
        .includes(filters.search.toLowerCase());

    const matchesType =
      filters.type === "all" || communication.type === filters.type;
    const matchesClient =
      filters.client === "all" ||
      communication.client.id.toString() === filters.client;

    return matchesSearch && matchesType && matchesClient;
  });

  // Quick action handlers
  const handleQuickAction = (action, client = null) => {
    setSelectedClient(client);
    setShowCommunicationForm(true);

    // Define action messages
    const actionMessages = {
      call: "Log a phone call",
      email: "Log an email",
      meeting: "Schedule a meeting",
      whatsapp: "Send WhatsApp message",
      followup: "Plan a follow-up", // Added the missing followup key
    };

    // Show toast for quick action
    toast.info(`Ready to ${actionMessages[action]}`);
  };

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
              Communication Log
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track all client communications - {communications.length} total
              entries
            </p>
          </div>

          <div className="flex flex-col xs:flex-row gap-3">
            <button className="flex items-center justify-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200 min-w-[120px]">
              <FaDownload className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Export</span>
            </button>

            <button
              onClick={() => setShowCommunicationForm(true)}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 min-w-[120px]"
            >
              <FaPlus className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Log Communication</span>
            </button>
          </div>
        </div>
      </div>

      {/* Communication Statistics */}
      <CommunicationStats communications={communications} />

      {/* Quick Actions */}
      <QuickActions onQuickAction={handleQuickAction} />

      {/* Filters Section */}
      <CommunicationFilters filters={filters} onFiltersChange={setFilters} />

      {/* Communication Log */}
      <CommunicationLog communications={filteredCommunications} />

      {/* Communication Form Modal */}
      {showCommunicationForm && (
        <CommunicationForm
          client={selectedClient}
          onSave={handleAddCommunication}
          onClose={() => {
            setShowCommunicationForm(false);
            setSelectedClient(null);
          }}
        />
      )}
    </div>
  );
};

export default Communication;
