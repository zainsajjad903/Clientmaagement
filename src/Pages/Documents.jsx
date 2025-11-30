// src/pages/Documents.jsx
import { useState, useEffect } from "react";
import { FaPlus, FaDownload, FaCloudUploadAlt } from "react-icons/fa";

import DocumentStats from "../components/Documents/DocumentStats";
import DocumentFilters from "../components/Documents/DocumentFilters";
import DocumentList from "../components/Documents/DocumentList";
import DocumentUploadForm from "../components/Documents/DocumentUploadForm";
import { toast } from "react-toastify";

// Firebase
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

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

  // Load documents from Firestore
  useEffect(() => {
    const q = collection(db, "documents");

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((snap) => {
          const d = snap.data();
          return {
            id: snap.id,
            name: d.name || "",
            description: d.description || "",
            type: d.type || "",
            fileType: d.fileType || "",
            size: d.size || "",
            client: d.client || {
              id: "",
              name: "",
              company: "",
              avatar: "",
            },
            tags: d.tags || [],
            uploadedBy: d.uploadedBy || "Unknown",
            uploadedAt: d.uploadedAt || "",
            updatedAt: d.updatedAt || "",
            downloadUrl: d.downloadUrl || "#",
            previewUrl: d.previewUrl || "#",
          };
        });

        setDocuments(docs);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading documents:", error);
        toast.error("Failed to load documents");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Add new document (called from DocumentUploadForm)
  const handleAddDocument = async (documentData) => {
    try {
      const payload = {
        ...documentData,
        uploadedBy: "Current User", // later: take from auth
        uploadedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        downloadUrl: documentData.downloadUrl || "#",
        previewUrl: documentData.previewUrl || "#",
      };

      await addDoc(collection(db, "documents"), payload);

      setShowUploadForm(false);
      setEditingDocument(null);
      toast.success(`Document "${documentData.name}" uploaded successfully!`);
    } catch (error) {
      console.error("Error adding document:", error);
      toast.error("Failed to upload document");
    }
  };

  // Update existing document
  const handleUpdateDocument = async (documentData) => {
    if (!editingDocument?.id) {
      toast.error("No document selected for editing");
      return;
    }

    try {
      const docRef = doc(db, "documents", editingDocument.id);

      const payload = {
        ...documentData,
        // keep created info, update timestamp
        uploadedBy: editingDocument.uploadedBy || "Current User",
        uploadedAt: editingDocument.uploadedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        downloadUrl: editingDocument.downloadUrl || "#",
        previewUrl: editingDocument.previewUrl || "#",
      };

      await updateDoc(docRef, payload);

      setShowUploadForm(false);
      setEditingDocument(null);
      toast.success("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Failed to update document");
    }
  };

  // Delete document
  const handleDeleteDocument = async (documentId) => {
    const documentToDelete = documents.find((doc) => doc.id === documentId);

    const confirmDelete = async () => {
      try {
        await deleteDoc(doc(db, "documents", documentId));
        toast.success("Document deleted successfully!");
      } catch (error) {
        console.error("Error deleting document:", error);
        toast.error("Failed to delete document");
      }
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

  // Download document (currently simulated)
  const handleDownloadDocument = (document) => {
    if (!document.downloadUrl || document.downloadUrl === "#") {
      toast.info(
        `Download not configured yet for "${document.name}". (No file URL stored)`
      );
      return;
    }

    // In future: window.open(document.downloadUrl, "_blank");
    toast.info(`Downloading "${document.name}"...`);
  };

  // Preview document (currently simulated)
  const handlePreviewDocument = (document) => {
    if (!document.previewUrl || document.previewUrl === "#") {
      toast.info(
        `Preview not configured yet for "${document.name}". (No preview URL stored)`
      );
      return;
    }

    // In future: open preview modal or new tab
    toast.info(`Opening preview for "${document.name}"...`);
  };

  // Filter documents
  const filteredDocuments = documents.filter((docItem) => {
    const search = filters.search.toLowerCase();

    const name = (docItem.name || "").toLowerCase();
    const clientName = (docItem.client?.name || "").toLowerCase();
    const description = (docItem.description || "").toLowerCase();

    const matchesSearch =
      name.includes(search) ||
      clientName.includes(search) ||
      description.includes(search);

    const matchesFileType =
      filters.fileType === "all" || docItem.type === filters.fileType;

    const matchesClient =
      filters.client === "all" ||
      docItem.client?.id === filters.client ||
      docItem.client?.id === parseInt(filters.client, 10);

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
              Centralized file storage for all clients – {documents.length}{" "}
              total documents
            </p>
          </div>

          <div className="flex flex-col xs:flex-row gap-3">
            <button className="flex items-center justify-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200 min-w-[120px]">
              <FaDownload className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Export List</span>
            </button>

            <button
              onClick={() => {
                setEditingDocument(null);
                setShowUploadForm(true);
              }}
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
