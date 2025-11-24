// src/components/Reports/ReportExport.jsx
import { useState } from "react";
import { FaDownload, FaFilePdf, FaFileExcel, FaTimes } from "react-icons/fa";

const ReportExport = ({ onExport }) => {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const exportOptions = [
    {
      format: "pdf",
      label: "PDF Document",
      description: "High-quality document for presentations",
      icon: FaFilePdf,
      color: "text-red-600",
    },
    {
      format: "excel",
      label: "Excel Spreadsheet",
      description: "Editable data for further analysis",
      icon: FaFileExcel,
      color: "text-green-600",
    },
  ];

  const reportTypes = [
    { value: "client-list", label: "Client List" },
    { value: "revenue", label: "Revenue Report" },
    { value: "pipeline", label: "Pipeline Summary" },
    { value: "full", label: "Full Report" },
  ];

  const handleExport = (format, reportType = "client-list") => {
    onExport(format, reportType);
    setShowExportMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowExportMenu(!showExportMenu)}
        className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 min-w-[120px]"
      >
        <FaDownload className="h-4 w-4 flex-shrink-0" />
        <span className="truncate">Export</span>
      </button>

      {showExportMenu && (
        <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Export Report
            </h3>
            <button
              onClick={() => setShowExportMenu(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <FaTimes className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Export Options */}
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Report Type
              </label>
              <select className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {reportTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Export Format
              </label>
              {exportOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.format}
                    onClick={() => handleExport(option.format)}
                    className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                  >
                    <div
                      className={`p-2 rounded-lg ${option.color} bg-opacity-10`}
                    >
                      <Icon className={`h-5 w-5 ${option.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {option.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-b-xl">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Exports include all currently filtered data
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportExport;
