// components/Clients/BulkActions.jsx
import { FaTrash, FaEnvelope, FaTags, FaDownload } from "react-icons/fa";

const BulkActions = ({ selectedCount, onBulkDelete }) => {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="bg-blue-600 text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
            {selectedCount} selected
          </span>
          <span className="text-sm text-blue-700 dark:text-blue-300">
            Perform actions on selected clients
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 rounded-lg transition duration-200">
            <FaEnvelope className="h-4 w-4" />
            <span>Email</span>
          </button>

          <button className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 rounded-lg transition duration-200">
            <FaTags className="h-4 w-4" />
            <span>Add Tags</span>
          </button>

          <button className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 rounded-lg transition duration-200">
            <FaDownload className="h-4 w-4" />
            <span>Export</span>
          </button>

          <button
            onClick={onBulkDelete}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 rounded-lg transition duration-200"
          >
            <FaTrash className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;
