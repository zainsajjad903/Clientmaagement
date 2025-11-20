// src/components/Documents/DocumentStats.jsx
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileAlt,
  FaFolder,
} from "react-icons/fa";

const DocumentStats = ({ documents }) => {
  const stats = {
    total: documents.length,
    proposals: documents.filter((doc) => doc.type === "proposal").length,
    contracts: documents.filter((doc) => doc.type === "contract").length,
    invoices: documents.filter((doc) => doc.type === "invoice").length,
    designs: documents.filter((doc) => doc.type === "design").length,
    other: documents.filter(
      (doc) => !["proposal", "contract", "invoice", "design"].includes(doc.type)
    ).length,
  };

  const getPercentage = (count) => {
    return documents.length > 0
      ? ((count / documents.length) * 100).toFixed(1)
      : 0;
  };

  // FIXED: Return component references instead of JSX elements
  const getTypeIcon = (type) => {
    const icons = {
      proposal: FaFilePdf,
      contract: FaFileWord,
      invoice: FaFileExcel,
      design: FaFileImage,
      other: FaFileAlt,
    };
    return icons[type] || FaFileAlt;
  };

  const getTypeColor = (type) => {
    const colors = {
      proposal: "text-blue-600 dark:text-blue-400",
      contract: "text-green-600 dark:text-green-400",
      invoice: "text-yellow-600 dark:text-yellow-400",
      design: "text-purple-600 dark:text-purple-400",
      other: "text-gray-600 dark:text-gray-400",
    };
    return colors[type] || "text-gray-600 dark:text-gray-400";
  };

  const getBgColor = (type) => {
    const colors = {
      proposal: "bg-blue-50 dark:bg-blue-900/20",
      contract: "bg-green-50 dark:bg-green-900/20",
      invoice: "bg-yellow-50 dark:bg-yellow-900/20",
      design: "bg-purple-50 dark:bg-purple-900/20",
      other: "bg-gray-50 dark:bg-gray-900/20",
    };
    return colors[type] || "bg-gray-50 dark:bg-gray-900/20";
  };

  const statItems = [
    { type: "proposal", label: "Proposals", count: stats.proposals },
    { type: "contract", label: "Contracts", count: stats.contracts },
    { type: "invoice", label: "Invoices", count: stats.invoices },
    { type: "design", label: "Designs", count: stats.designs },
    { type: "other", label: "Other", count: stats.other },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
      {/* Total Documents */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {stats.total}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              All documents
            </p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <FaFolder className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Document Type Stats */}
      {statItems.map((item) => {
        // FIXED: Get the Icon component, not JSX
        const IconComponent = getTypeIcon(item.type);

        return (
          <div
            key={item.type}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {item.label}
                </p>
                <p
                  className={`text-2xl font-bold mt-1 ${getTypeColor(
                    item.type
                  )}`}
                >
                  {item.count}
                </p>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${getPercentage(item.count)}%`,
                        backgroundColor:
                          getComputedStyle(document.documentElement)
                            .getPropertyValue(`--color-${item.type}-500`)
                            .trim() || "#6b7280",
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {getPercentage(item.count)}%
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${getBgColor(item.type)}`}>
                {/* FIXED: Use IconComponent as a component */}
                <IconComponent
                  className={`h-5 w-5 ${getTypeColor(item.type)}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DocumentStats;
