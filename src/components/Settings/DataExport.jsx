import React, { useState } from "react";

const DataExport = () => {
  const [exportFormat, setExportFormat] = useState("CSV");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [exportType, setExportType] = useState("clientList");

  const handleExport = () => {
    // In a real app, this would trigger the export API call
    console.log("Exporting:", {
      format: exportFormat,
      type: exportType,
      dateRange,
    });

    // Simulate export success
    alert(`Exporting ${exportType} as ${exportFormat} format`);
  };

  const exportTypes = [
    { value: "clientList", label: "Client List" },
    { value: "revenue", label: "Revenue Report" },
    { value: "pipeline", label: "Pipeline Summary" },
    { value: "communications", label: "Communication Logs" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Data Export</h2>

      <div className="space-y-6">
        {/* Export Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Export Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exportTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setExportType(type.value)}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  exportType === type.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="font-medium">{type.label}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {type.value === "clientList" &&
                    "Export complete client database"}
                  {type.value === "revenue" && "Revenue and financial reports"}
                  {type.value === "pipeline" &&
                    "Current project pipeline status"}
                  {type.value === "communications" &&
                    "All client communication logs"}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range (Optional)
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) =>
                  setDateRange({ ...dateRange, startDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-xs text-gray-500 mt-1">Start Date</div>
            </div>
            <div className="flex-1">
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) =>
                  setDateRange({ ...dateRange, endDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-xs text-gray-500 mt-1">End Date</div>
            </div>
          </div>
        </div>

        {/* Export Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Export Format
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="CSV"
                checked={exportFormat === "CSV"}
                onChange={(e) => setExportFormat(e.target.value)}
                className="mr-2"
              />
              CSV Format
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="PDF"
                checked={exportFormat === "PDF"}
                onChange={(e) => setExportFormat(e.target.value)}
                className="mr-2"
              />
              PDF Format
            </label>
          </div>
        </div>

        {/* Export Button */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleExport}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
          >
            Export {exportTypes.find((t) => t.value === exportType)?.label} as{" "}
            {exportFormat}
          </button>
          <p className="text-sm text-gray-500 mt-2">
            The export process may take a few minutes depending on the amount of
            data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataExport;
