// pages/Dashboard.jsx
import { useState, useEffect } from "react";
import {
  FaUsers,
  FaProjectDiagram,
  FaBell,
  FaDollarSign,
  FaChartLine,
  FaCalendarAlt,
  FaPlus,
  FaSearch,
  FaFilter,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

// Import components we'll create
import StatsCards from "../components/Dashboard/StatsCards";
import PerformanceCharts from "../components/Dashboard/PerformanceCharts";
import RecentActivities from "../components/Dashboard/RecentActivities";
import UpcomingFollowups from "../components/Dashboard/UpcomingFollowups";
import QuickActions from "../components/Dashboard/QuickActions";
import ClientPipeline from "../components/Dashboard/ClientPipeline";
import PlatformDistribution from "../components/Dashboard/PlatformDistribution";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Welcome back! Here's what's happening with your clients today.
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="quarterly">This Quarter</option>
              <option value="yearly">This Year</option>
            </select>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition duration-200">
              <FaPlus className="h-4 w-4" />
              <span>Add Client</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Stats and Pipeline */}
        <div className="xl:col-span-2 space-y-6">
          {/* Key Metrics Cards */}
          <StatsCards />

          {/* Performance Charts */}
          <PerformanceCharts timeRange={timeRange} />

          {/* Client Pipeline */}
          <ClientPipeline />
        </div>

        {/* Right Column - Side Panels */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <QuickActions />

          {/* Upcoming Follow-ups */}
          <UpcomingFollowups />

          {/* Platform Distribution */}
          <PlatformDistribution />

          {/* Recent Activities */}
          <RecentActivities />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
