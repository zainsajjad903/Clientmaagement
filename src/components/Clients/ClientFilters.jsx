// components/Clients/ClientFilters.jsx
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { useState } from "react";

const ClientFilters = ({ filters, onFiltersChange }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      status: "all",
      platform: "all",
      dateRange: "all",
    });
  };

  const hasActiveFilters =
    filters.search || filters.status !== "all" || filters.platform !== "all";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6">
      {/* Main Filter Row */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* Search Bar - Full width on mobile, flexible on desktop */}
        <div className="flex-1 w-full lg:max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              placeholder="Search clients..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
            />
          </div>
        </div>

        {/* Filter Controls - Stack on mobile, row on desktop */}
        <div className="flex flex-col xs:flex-row gap-3 lg:gap-4 lg:items-center">
          {/* Status Filter */}
          <div className="flex-1 xs:flex-none">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full xs:w-auto bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="lead">Lead</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Platform Filter */}
          <div className="flex-1 xs:flex-none">
            <select
              value={filters.platform}
              onChange={(e) => handleFilterChange("platform", e.target.value)}
              className="w-full xs:w-auto bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Platforms</option>
              <option value="Upwork">Upwork</option>
              <option value="Fiverr">Fiverr</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Direct">Direct</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Referral">Referral</option>
            </select>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-2 rounded-lg transition duration-200 flex-1 xs:flex-none min-w-[100px]"
            >
              <FaFilter className="h-4 w-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                Filters
              </span>
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center justify-center space-x-2 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 px-3 py-2 rounded-lg transition duration-200 flex-1 xs:flex-none min-w-[100px]"
              >
                <FaTimes className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                <span className="text-sm text-red-700 dark:text-red-300 truncate">
                  Clear
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filters - Responsive grid */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Added
              </label>
              <select className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Type
              </label>
              <select className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">All Types</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile Development</option>
                <option value="design">UI/UX Design</option>
                <option value="marketing">Digital Marketing</option>
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Budget Range
              </label>
              <select className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">All Budgets</option>
                <option value="0-5000">$0 - $5,000</option>
                <option value="5000-15000">$5,000 - $15,000</option>
                <option value="15000-30000">$15,000 - $30,000</option>
                <option value="30000+">$30,000+</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientFilters;
