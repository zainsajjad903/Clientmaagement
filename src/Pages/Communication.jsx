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

// Firebase imports
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

// Import components
import CommunicationStats from "../components/Communication/CommunicationStats";
import CommunicationFilters from "../components/Communication/CommunicationFilters";
import CommunicationLog from "../components/Communication/CommunicationLog";
import CommunicationForm from "../components/Communication/CommunicationForm";
import QuickActions from "../components/Communication/QuickActions";

// Firestore collection references
const communicationsCollectionRef = collection(db, "communications");
const clientsCollectionRef = collection(db, "clients");

const Communication = () => {
  const [communications, setCommunications] = useState([]);
  const [clients, setClients] = useState([]); // 🔹 all clients from DB
  const [loading, setLoading] = useState(true);
  const [showCommunicationForm, setShowCommunicationForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    client: "all",
    dateRange: "7days",
  });

  // 🔹 Realtime listener for communications
  useEffect(() => {
    const toastId = toast.loading("Loading communications...");

    const unsubscribe = onSnapshot(
      communicationsCollectionRef,
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        console.log("Realtime communications from Firestore:", data);
        setCommunications(data);
        setLoading(false);
        toast.dismiss(toastId);
        toast.success(`${data.length} communications loaded successfully!`);
      },
      (error) => {
        console.error("onSnapshot error (communications):", error);
        setLoading(false);
        toast.dismiss(toastId);
        toast.error(`Failed to load communications: ${error.message}`);
      }
    );

    return () => unsubscribe();
  }, []);

  // 🔹 Realtime listener for clients (same collection as Clients page)
  useEffect(() => {
    const unsubscribe = onSnapshot(
      clientsCollectionRef,
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        console.log("Realtime clients for Communication page:", data);
        setClients(data);
      },
      (error) => {
        console.error("onSnapshot error (clients):", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // 🔹 Add new communication (save to Firestore)
  const handleAddCommunication = async (communicationData) => {
    try {
      console.log("Adding communication..", communicationData);

      await addDoc(communicationsCollectionRef, {
        ...communicationData,
        createdAt: serverTimestamp(),
        addedBy: "Current User",
      });

      // Realtime listener khud list update karega
      setShowCommunicationForm(false);
      setSelectedClient(null);
      toast.success("Communication logged successfully!");
    } catch (error) {
      console.error("Error logging communication:", error);
      toast.error(`Failed to log communication: ${error.message}`);
    }
  };

  // 🔹 Filters
  const filteredCommunications = communications.filter((communication) => {
    const search = filters.search.toLowerCase();

    const matchesSearch =
      communication.client?.name?.toLowerCase().includes(search) ||
      communication.subject?.toLowerCase().includes(search) ||
      communication.summary?.toLowerCase().includes(search);

    const matchesType =
      filters.type === "all" || communication.type === filters.type;

    const matchesClient =
      filters.client === "all" ||
      communication.client?.id?.toString() === filters.client;

    return matchesSearch && matchesType && matchesClient;
  });

  // 🔹 Quick action handlers
  const handleQuickAction = (action, client = null) => {
    setSelectedClient(client);
    setShowCommunicationForm(true);

    const actionMessages = {
      call: "Log a phone call",
      email: "Log an email",
      meeting: "Schedule a meeting",
      whatsapp: "Send WhatsApp message",
      followup: "Plan a follow-up",
    };

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
      <QuickActions onQuickAction={handleQuickAction} clients={clients} />

      {/* Filters Section */}
      <CommunicationFilters
        filters={filters}
        onFiltersChange={setFilters}
        clients={clients} // 🔹 so dropdown can show real clients if you use it
      />

      {/* Communication Log */}
      <CommunicationLog communications={filteredCommunications} />

      {/* Communication Form Modal */}
      {showCommunicationForm && (
        <CommunicationForm
          client={selectedClient}
          clients={clients} // 🔹 yahan form ke liye real clients list
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
