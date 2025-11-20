// src/pages/Documents.jsx
import { useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaTrash,
  FaEdit,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileAlt,
  FaFolder,
  FaCloudUploadAlt,
} from "react-icons/fa";

// Import components we'll create
import DocumentStats from "../components/Documents/DocumentStats";
import DocumentFilters from "../components/Documents/DocumentFilters";
import DocumentList from "../components/Documents/DocumentList";
import DocumentUploadForm from "../components/Documents/DocumentUploadForm";
import { toast } from "react-toastify";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    fileType: "all",
    client: "all",
    dateRange: "all",
  });

  // Mock data - replace with API calls
  useEffect(() => {
    const mockDocuments = [
      {
        id: 1,
        name: "Project Proposal - TechCorp",
        type: "proposal",
        fileType: "pdf",
        size: "2.4 MB",
        client: {
          id: 1,
          name: "Sarah Johnson",
          company: "TechCorp Inc",
        },
        uploadedBy: "John Doe",
        uploadedAt: "2024-01-10T09:00:00",
        description: "Initial project proposal with scope and pricing",
        tags: ["proposal", "contract", "important"],
        downloadUrl: "#",
        previewUrl: "#",
      },
      {
        id: 2,
        name: "Service Agreement",
        type: "contract",
        fileType: "docx",
        size: "1.2 MB",
        client: {
          id: 2,
          name: "Mike Thompson",
          company: "Design Studio LLC",
        },
        uploadedBy: "Jane Smith",
        uploadedAt: "2024-01-08T14:20:00",
        description: "Signed service agreement",
        tags: ["contract", "signed"],
        downloadUrl: "#",
        previewUrl: "#",
      },
      {
        id: 3,
        name: "Invoice_January_2024",
        type: "invoice",
        fileType: "pdf",
        size: "0.8 MB",
        client: {
          id: 1,
          name: "Sarah Johnson",
          company: "TechCorp Inc",
        },
        uploadedBy: "John Doe",
        uploadedAt: "2024-01-05T11:30:00",
        description: "Monthly service invoice",
        tags: ["invoice", "billing"],
        downloadUrl: "#",
        previewUrl: "#",
      },
      {
        id: 4,
        name: "Client Meeting Notes",
        type: "notes",
        fileType: "docx",
        size: "0.5 MB",
        client: {
          id: 3,
          name: "Emily Davis",
          company: "Startup Innovations",
        },
        uploadedBy: "Jane Smith",
        uploadedAt: "2024-01-12T16:45:00",
        description: "Detailed notes from client meeting",
        tags: ["meeting", "notes"],
        downloadUrl: "#",
        previewUrl: "#",
      },
      {
        id: 5,
        name: "Project Wireframes",
        type: "design",
        fileType: "image",
        size: "3.1 MB",
        client: {
          id: 2,
          name: "Mike Thompson",
          company: "Design Studio LLC",
        },
        uploadedBy: "John Doe",
        uploadedAt: "2024-01-15T10:15:00",
        description: "Initial wireframe designs",
        tags: ["design", "wireframe"],
        downloadUrl: "#",
        previewUrl: "#",
      },
      {
        id: 6,
        name: "Budget Spreadsheet",
        type: "financial",
        fileType: "xlsx",
        size: "1.5 MB",
        client: {
          id: 4,
          name: "Robert Wilson",
          company: "Business Consulting Co",
        },
        uploadedBy: "Jane Smith",
        uploadedAt: "2024-01-07T13:20:00",
        description: "Project budget breakdown",
        tags: ["financial", "budget"],
        downloadUrl: "#",
        previewUrl: "#",
      },
    ];

    setTimeout(() => {
      setDocuments(mockDocuments);
      setLoading(false);
      // toast.success("Documents loaded successfully!");
    }, 1000);
  }, []);

  // Add new document
  const handleAddDocument = (documentData) => {
    const newDocument = {
      id: Date.now(),
      ...documentData,
      uploadedAt: new Date().toISOString(),
      uploadedBy: "Current User", // This would come from auth context
    };
    setDocuments([newDocument, ...documents]);
    setShowUploadForm(false);
    toast.success(`Document "${documentData.name}" uploaded successfully!`);
  };

  // Update document
  const handleUpdateDocument = (documentData) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === editingDocument.id
          ? {
              ...doc,
              ...documentData,
              updatedAt: new Date().toISOString(),
            }
          : doc
      )
    );
    setEditingDocument(null);
    setShowUploadForm(false);
    toast.success("Document updated successfully!");
  };

  // Delete document
  const handleDeleteDocument = (documentId) => {
    const documentToDelete = documents.find((doc) => doc.id === documentId);

    const confirmDelete = () => {
      setDocuments(documents.filter((doc) => doc.id !== documentId));
      toast.success(`Document deleted successfully!`);
    };

    toast.info(
      <div className="p-4">
        <div className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Delete Document?
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Are you sure you want to delete "{documentToDelete?.name}"? This
          action cannot be undone.
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

  // Download document
  const handleDownloadDocument = (document) => {
    // Simulate download
    toast.info(`Downloading "${document.name}"...`);
    // In real app, this would trigger actual download
  };

  // Preview document
  const handlePreviewDocument = (document) => {
    // Simulate preview
    toast.info(`Opening preview for "${document.name}"...`);
    // In real app, this would open a preview modal
  };

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      doc.client.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      doc.description.toLowerCase().includes(filters.search.toLowerCase());

    const matchesFileType =
      filters.fileType === "all" || doc.type === filters.fileType;

    const matchesClient =
      filters.client === "all" || doc.client.id === parseInt(filters.client);

    return matchesSearch && matchesFileType && matchesClient;
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
              Document Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Centralized file storage for all clients - {documents.length}{" "}
              total documents
            </p>
          </div>

          <div className="flex flex-col xs:flex-row gap-3">
            <button className="flex items-center justify-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200 min-w-[120px]">
              <FaDownload className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Export List</span>
            </button>

            <button
              onClick={() => setShowUploadForm(true)}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 min-w-[120px]"
            >
              <FaCloudUploadAlt className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Upload File</span>
            </button>
          </div>
        </div>
      </div>

      {/* Document Statistics */}
      <DocumentStats documents={documents} />

      {/* Filters Section */}
      <DocumentFilters filters={filters} onFiltersChange={setFilters} />

      {/* Document List */}
      <DocumentList
        documents={filteredDocuments}
        onEditDocument={(document) => {
          setEditingDocument(document);
          setShowUploadForm(true);
        }}
        onDeleteDocument={handleDeleteDocument}
        onDownloadDocument={handleDownloadDocument}
        onPreviewDocument={handlePreviewDocument}
      />

      {/* Document Upload/Edit Form Modal */}
      {showUploadForm && (
        <DocumentUploadForm
          document={editingDocument}
          onSave={editingDocument ? handleUpdateDocument : handleAddDocument}
          onClose={() => {
            setShowUploadForm(false);
            setEditingDocument(null);
          }}
        />
      )}
    </div>
  );
};

export default Documents;
