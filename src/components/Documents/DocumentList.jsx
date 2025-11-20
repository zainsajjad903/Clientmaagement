// src/components/Documents/DocumentList.jsx - Fixed getFileIcon function
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileAlt,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";

const DocumentList = ({
  documents,
  onEditDocument,
  onDeleteDocument,
  onDownloadDocument,
  onPreviewDocument,
}) => {
  // FIXED: Return component references instead of JSX
  const getFileIcon = (fileType) => {
    const icons = {
      pdf: FaFilePdf,
      docx: FaFileWord,
      xlsx: FaFileExcel,
      image: FaFileImage,
    };
    return icons[fileType] || FaFileAlt;
  };

  const getFileColor = (fileType) => {
    const colors = {
      pdf: "text-red-600 dark:text-red-400",
      docx: "text-blue-600 dark:text-blue-400",
      xlsx: "text-green-600 dark:text-green-400",
      image: "text-purple-600 dark:text-purple-400",
    };
    return colors[fileType] || "text-gray-600 dark:text-gray-400";
  };

  const getTypeBadge = (type) => {
    const colors = {
      proposal: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      contract:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      invoice:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      design:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      notes: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      financial:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    };

    const typeLabels = {
      proposal: "Proposal",
      contract: "Contract",
      invoice: "Invoice",
      design: "Design",
      notes: "Notes",
      financial: "Financial",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          colors[type] ||
          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        }`}
      >
        {typeLabels[type] || type}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const documentDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    if (documentDate.getTime() === today.getTime()) {
      return `Today, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (documentDate.getTime() === yesterday.getTime()) {
      return `Yesterday, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    return (
      date.toLocaleDateString() +
      ", " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const formatFileSize = (size) => {
    const sizeInBytes = parseFloat(size) * 1024 * 1024; // Convert MB to bytes
    if (sizeInBytes < 1024) {
      return sizeInBytes + " B";
    } else if (sizeInBytes < 1048576) {
      return (sizeInBytes / 1024).toFixed(1) + " KB";
    } else {
      return (sizeInBytes / 1048576).toFixed(1) + " MB";
    }
  };

  if (documents.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <FaFileAlt className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No documents found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your search filters or upload a new document.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                Document
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                Client
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                Type
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                Size
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                Uploaded
              </th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {documents.map((document) => {
              // FIXED: Get the Icon component
              const FileIconComponent = getFileIcon(document.fileType);

              return (
                <tr
                  key={document.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-200"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-lg ${getFileColor(
                          document.fileType
                        )} bg-opacity-10`}
                      >
                        {/* FIXED: Use FileIconComponent as a component */}
                        <FileIconComponent
                          className={`h-6 w-6 ${getFileColor(
                            document.fileType
                          )}`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {document.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {document.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {document.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                        {document.client.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {document.client.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {document.client.company}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">{getTypeBadge(document.type)}</td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatFileSize(document.size)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <FaUser className="h-3 w-3" />
                      <span>{document.uploadedBy}</span>
                      <FaCalendarAlt className="h-3 w-3 ml-2" />
                      <span>{formatDate(document.uploadedAt)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onPreviewDocument(document)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition duration-200"
                        title="Preview"
                      >
                        <FaEye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDownloadDocument(document)}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition duration-200"
                        title="Download"
                      >
                        <FaDownload className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onEditDocument(document)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition duration-200"
                        title="Edit"
                      >
                        <FaEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDeleteDocument(document.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition duration-200"
                        title="Delete"
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {documents.map((document) => {
            // FIXED: Get the Icon component
            const FileIconComponent = getFileIcon(document.fileType);

            return (
              <div
                key={document.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-lg ${getFileColor(
                      document.fileType
                    )} bg-opacity-10 flex-shrink-0`}
                  >
                    {/* FIXED: Use FileIconComponent as a component */}
                    <FileIconComponent
                      className={`h-6 w-6 ${getFileColor(document.fileType)}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-base font-medium text-gray-900 dark:text-white truncate">
                          {document.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {document.description}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {getTypeBadge(document.type)}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <FaUser className="h-3 w-3" />
                        <span>{document.uploadedBy}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaCalendarAlt className="h-3 w-3" />
                        <span>{formatDate(document.uploadedAt)}</span>
                      </div>
                      <span>{formatFileSize(document.size)}</span>
                    </div>

                    <div className="mt-3 flex items-center space-x-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                          {document.client.avatar}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {document.client.name}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {document.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-end space-x-3">
                      <button
                        onClick={() => onPreviewDocument(document)}
                        className="flex items-center space-x-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition duration-200 text-sm"
                      >
                        <FaEye className="h-3 w-3" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => onDownloadDocument(document)}
                        className="flex items-center space-x-1 px-3 py-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition duration-200 text-sm"
                      >
                        <FaDownload className="h-3 w-3" />
                        <span>Download</span>
                      </button>
                      <button
                        onClick={() => onEditDocument(document)}
                        className="flex items-center space-x-1 px-3 py-1.5 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition duration-200 text-sm"
                      >
                        <FaEdit className="h-3 w-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => onDeleteDocument(document.id)}
                        className="flex items-center space-x-1 px-3 py-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition duration-200 text-sm"
                      >
                        <FaTrash className="h-3 w-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DocumentList;
