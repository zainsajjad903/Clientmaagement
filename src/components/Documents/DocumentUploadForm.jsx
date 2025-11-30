// src/components/Documents/DocumentUploadForm.jsx
import { useState, useEffect } from "react";
import {
  FaTimes,
  FaCloudUploadAlt,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileAlt,
  FaUser,
  FaTag,
  FaStickyNote,
} from "react-icons/fa";

// Firebase
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const DocumentUploadForm = ({ document, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "proposal",
    fileType: "pdf",
    size: "",
    client: {
      id: "",
      name: "",
      company: "",
    },
    tags: [],
    newTag: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);

  // Clients from Firestore
  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(true);

  const fileTypes = [
    { value: "pdf", label: "PDF", icon: FaFilePdf },
    { value: "docx", label: "Word Document", icon: FaFileWord },
    { value: "xlsx", label: "Excel Spreadsheet", icon: FaFileExcel },
    { value: "image", label: "Image", icon: FaFileImage },
    { value: "other", label: "Other", icon: FaFileAlt },
  ];

  const documentTypes = [
    { value: "proposal", label: "Proposal" },
    { value: "contract", label: "Contract" },
    { value: "invoice", label: "Invoice" },
    { value: "design", label: "Design" },
    { value: "notes", label: "Meeting Notes" },
    { value: "financial", label: "Financial" },
    { value: "other", label: "Other" },
  ];

  // Load clients from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "clients"),
      (snapshot) => {
        const data = snapshot.docs.map((docSnap) => {
          const d = docSnap.data();
          return {
            id: docSnap.id,
            name: d.name || "",
            company: d.company || d.businessName || "",
          };
        });

        setClients(data);
        setClientsLoading(false);
      },
      (error) => {
        console.error("Error loading clients in DocumentUploadForm:", error);
        setClientsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Initialize form with document data if editing OR default client when clients are loaded
  useEffect(() => {
    if (!clients.length) {
      // Wait until we have clients before initializing defaults
      return;
    }

    if (document) {
      setFormData({
        name: document.name || "",
        description: document.description || "",
        type: document.type || "proposal",
        fileType: document.fileType || "pdf",
        size: document.size || "",
        client: document.client ||
          clients[0] || { id: "", name: "", company: "" },
        tags: document.tags || [],
        newTag: "",
      });
    } else {
      // New document → set default client if none assigned yet
      setFormData((prev) => ({
        ...prev,
        client:
          prev.client.id || !clients.length
            ? prev.client
            : clients[0] || { id: "", name: "", company: "" },
      }));
    }
  }, [document, clients]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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
      (client) => client.id === clientId || client.id === parseInt(clientId, 10)
    );

    if (selectedClient) {
      setFormData((prev) => ({
        ...prev,
        client: selectedClient,
      }));
      if (errors.client) {
        setErrors((prev) => ({ ...prev, client: "" }));
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFormData((prev) => ({
        ...prev,
        name: prev.name || selectedFile.name,
        size: (selectedFile.size / (1024 * 1024)).toFixed(1) + " MB",
      }));

      const extension = selectedFile.name.split(".").pop().toLowerCase();
      const fileTypeMap = {
        pdf: "pdf",
        doc: "docx",
        docx: "docx",
        xls: "xlsx",
        xlsx: "xlsx",
        jpg: "image",
        jpeg: "image",
        png: "image",
        gif: "image",
      };

      setFormData((prev) => ({
        ...prev,
        fileType: fileTypeMap[extension] || "other",
      }));

      if (errors.file) {
        setErrors((prev) => ({ ...prev, file: "" }));
      }
    }
  };

  const handleAddTag = () => {
    if (
      formData.newTag.trim() &&
      !formData.tags.includes(formData.newTag.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: "",
      }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Document name is required";
    }

    if (!formData.client.id) {
      newErrors.client = "Please select a client";
    }

    if (!formData.type) {
      newErrors.type = "Document type is required";
    }

    if (!file && !document) {
      newErrors.file = "Please select a file to upload";
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
      const clientAvatar =
        formData.client.name
          ?.split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase() || "";

      const documentData = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        fileType: formData.fileType,
        size: formData.size,
        client: {
          id: formData.client.id,
          name: formData.client.name,
          company: formData.client.company,
          avatar: clientAvatar,
        },
        tags: formData.tags || [],
      };

      // Simulate file upload (replace later with Firebase Storage)
      if (file) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      // Let Documents.jsx handle Firestore write
      onSave(documentData);
    } catch (error) {
      console.error("Error saving document:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Not used yet but kept for future UI enhancements
  const getFileIcon = (fileType) => {
    const icons = {
      pdf: FaFilePdf,
      docx: FaFileWord,
      xlsx: FaFileExcel,
      image: FaFileImage,
    };
    return icons[fileType] || FaFileAlt;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FaCloudUploadAlt className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {document ? "Edit Document" : "Upload New Document"}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {document
                  ? "Update document details"
                  : "Upload and categorize a new document"}
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
          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Document File {!document && "*"}
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition duration-200">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                disabled={!!document}
              />
              <label htmlFor="file-upload" className="cursor-pointer block">
                <FaCloudUploadAlt className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {file
                    ? file.name
                    : document
                    ? document.name
                    : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {document
                    ? "File cannot be changed"
                    : "PDF, DOC, DOCX, XLSX, Images up to 10MB"}
                </p>
              </label>
            </div>
            {errors.file && (
              <p className="text-red-500 text-sm flex items-center space-x-1">
                <FaTimes className="h-3 w-3" />
                <span>{errors.file}</span>
              </p>
            )}
          </div>

          {/* Document Name and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Document Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter document name"
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
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Document Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={`w-full bg-white dark:bg-gray-700 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.type
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {documentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <FaTimes className="h-3 w-3" />
                  <span>{errors.type}</span>
                </p>
              )}
            </div>
          </div>

          {/* Client Selection */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <FaUser className="h-4 w-4" />
              <span>Client *</span>
            </label>
            <select
              value={formData.client.id}
              onChange={handleClientChange}
              disabled={clientsLoading}
              className={`w-full bg-white dark:bg-gray-700 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.client
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <option value="">
                {clientsLoading ? "Loading clients..." : "Select a client"}
              </option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name} - {client.company}
                </option>
              ))}
            </select>
            {errors.client && (
              <p className="text-red-500 text-sm flex items-center space-x-1">
                <FaTimes className="h-3 w-3" />
                <span>{errors.client}</span>
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <FaStickyNote className="h-4 w-4" />
              <span>Description</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              placeholder="Describe the document purpose and contents..."
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <FaTag className="h-4 w-4" />
              <span>Tags</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 hover:text-blue-600"
                  >
                    <FaTimes className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={formData.newTag}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, newTag: e.target.value }))
                }
                onKeyPress={handleKeyPress}
                placeholder="Add a tag..."
                className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200 text-sm"
              >
                Add
              </button>
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
                  <span>{document ? "Updating..." : "Uploading..."}</span>
                </>
              ) : (
                <>
                  <FaCloudUploadAlt className="h-4 w-4" />
                  <span>
                    {document ? "Update Document" : "Upload Document"}
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

export default DocumentUploadForm;
