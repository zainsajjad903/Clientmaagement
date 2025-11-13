// // pages/Clients.jsx
// import { useState, useEffect } from "react";
// import {
//   FaPlus,
//   FaSearch,
//   FaFilter,
//   FaDownload,
//   FaUpload,
//   FaUserPlus,
//   FaEdit,
//   FaTrash,
//   FaEye,
//   FaPhone,
//   FaEnvelope,
//   FaWhatsapp,
// } from "react-icons/fa";

// // Import components
// import ClientTable from "../components/Clients/ClientTable";
// import ClientFilters from "../components/Clients/ClientFilters";
// import ClientForm from "../components/Clients/ClientForm";
// import BulkActions from "../components/Clients/BulkActions";
// import ClientStats from "../components/Clients/ClientStats";

// const ClientManagement = () => {
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showClientForm, setShowClientForm] = useState(false);
//   const [editingClient, setEditingClient] = useState(null);
//   const [selectedClients, setSelectedClients] = useState([]);
//   const [filters, setFilters] = useState({
//     search: "",
//     status: "all",
//     platform: "all",
//     dateRange: "all",
//   });

//   // Mock data
//   useEffect(() => {
//     const mockClients = [
//       {
//         id: 1,
//         name: "Sarah Johnson",
//         email: "sarah@techcorp.com",
//         phone: "+1 (555) 123-4567",
//         company: "TechCorp Inc",
//         platform: "Upwork",
//         status: "active",
//         projectType: "Web Development",
//         budget: "$15,000",
//         lastContact: "2024-01-15",
//         nextFollowUp: "2024-01-22",
//         tags: ["VIP", "Retainer"],
//         addedBy: "John Doe",
//         notes: "Interested in e-commerce website",
//       },
//       // ... other mock clients (same as before)
//     ];

//     setTimeout(() => {
//       setClients(mockClients);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   // Add new client
//   const handleAddClient = (clientData) => {
//     const newClient = {
//       id: clients.length + 1,
//       ...clientData,
//       createdAt: new Date().toISOString(),
//       addedBy: "Current User",
//     };
//     setClients([newClient, ...clients]);
//     setShowClientForm(false);
//   };

//   // Update client
//   const handleUpdateClient = (clientData) => {
//     setClients(
//       clients.map((client) =>
//         client.id === editingClient.id
//           ? { ...client, ...clientData, updatedAt: new Date().toISOString() }
//           : client
//       )
//     );
//     setEditingClient(null);
//     setShowClientForm(false);
//   };

//   // Delete client
//   const handleDeleteClient = (clientId) => {
//     if (window.confirm("Are you sure you want to delete this client?")) {
//       setClients(clients.filter((client) => client.id !== clientId));
//     }
//   };

//   // Bulk delete
//   const handleBulkDelete = () => {
//     if (selectedClients.length === 0) return;
//     if (
//       window.confirm(
//         `Are you sure you want to delete ${selectedClients.length} clients?`
//       )
//     ) {
//       setClients(
//         clients.filter((client) => !selectedClients.includes(client.id))
//       );
//       setSelectedClients([]);
//     }
//   };

//   // Filter clients
//   const filteredClients = clients.filter((client) => {
//     const matchesSearch =
//       client.name.toLowerCase().includes(filters.search.toLowerCase()) ||
//       client.email.toLowerCase().includes(filters.search.toLowerCase()) ||
//       client.company.toLowerCase().includes(filters.search.toLowerCase());

//     const matchesStatus =
//       filters.status === "all" || client.status === filters.status;
//     const matchesPlatform =
//       filters.platform === "all" || client.platform === filters.platform;

//     return matchesSearch && matchesStatus && matchesPlatform;
//   });

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
//       {/* Header Section - Fixed responsive layout */}
//       <div className="mb-6">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           <div className="flex-1 min-w-0">
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
//               Client Management
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-1">
//               Manage all your clients in one place - {clients.length} total
//               clients
//             </p>
//           </div>

//           <div className="flex flex-col xs:flex-row gap-3">
//             <button className="flex items-center justify-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200 min-w-[120px]">
//               <FaDownload className="h-4 w-4 flex-shrink-0" />
//               <span className="truncate">Export</span>
//             </button>

//             <button
//               onClick={() => setShowClientForm(true)}
//               className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 min-w-[120px]"
//             >
//               <FaUserPlus className="h-4 w-4 flex-shrink-0" />
//               <span className="truncate">Add Client</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Client Statistics */}
//       <div className="mb-6">
//         <ClientStats clients={clients} />
//       </div>

//       {/* Bulk Actions */}
//       {selectedClients.length > 0 && (
//         <div className="mb-6">
//           <BulkActions
//             selectedCount={selectedClients.length}
//             onBulkDelete={handleBulkDelete}
//           />
//         </div>
//       )}

//       {/* Filters Section */}
//       <div className="mb-6">
//         <ClientFilters filters={filters} onFiltersChange={setFilters} />
//       </div>

//       {/* Clients Table */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//         <ClientTable
//           clients={filteredClients}
//           selectedClients={selectedClients}
//           onSelectClient={setSelectedClients}
//           onEditClient={(client) => {
//             setEditingClient(client);
//             setShowClientForm(true);
//           }}
//           onDeleteClient={handleDeleteClient}
//         />
//       </div>

//       {/* Client Form Modal - Fixed responsive modal */}
//       {showClientForm && (
//         <ClientForm
//           client={editingClient}
//           onSave={editingClient ? handleUpdateClient : handleAddClient}
//           onClose={() => {
//             setShowClientForm(false);
//             setEditingClient(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default ClientManagement;
