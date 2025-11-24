// src/components/Reports/ReportCharts.jsx
import { useState } from "react";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";

const ReportCharts = ({ data, filters }) => {
  const [activeChart, setActiveChart] = useState("revenue");

  // Chart configuration
  const chartConfigs = {
    revenue: {
      title: "Revenue Trend",
      icon: FaMoneyBillWave,
      data: data.revenueData,
      type: "bar",
    },
    clients: {
      title: "Client Acquisition",
      icon: FaUsers,
      data: data.platformStats,
      type: "pie",
    },
  };

  // Render revenue chart (bar chart)
  const renderRevenueChart = () => {
    const maxRevenue = Math.max(
      ...data.revenueData.map((item) => item.revenue)
    );

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            Monthly Revenue & Projects
          </h4>
          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Revenue</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Projects</span>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between space-x-2 h-48">
          {data.revenueData.map((item, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center space-y-2"
            >
              <div className="flex flex-col items-center space-y-1 flex-1 w-full justify-end">
                {/* Revenue Bar */}
                <div
                  className="w-3/4 bg-blue-500 rounded-t hover:bg-blue-600 transition-all duration-300"
                  style={{
                    height: `${(item.revenue / maxRevenue) * 80}%`,
                    minHeight: "4px",
                  }}
                  title={`$${item.revenue.toLocaleString()}`}
                ></div>

                {/* Projects Bar */}
                <div
                  className="w-1/2 bg-green-500 rounded-t hover:bg-green-600 transition-all duration-300"
                  style={{
                    height: `${(item.projects / 6) * 40}%`,
                    minHeight: "2px",
                  }}
                  title={`${item.projects} projects`}
                ></div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {item.month}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500">
                ${(item.revenue / 1000).toFixed(0)}K
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Summary */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              $
              {data.revenueData
                .reduce((sum, item) => sum + item.revenue, 0)
                .toLocaleString()}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              Total Revenue
            </div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {data.revenueData.reduce((sum, item) => sum + item.projects, 0)}
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 font-medium">
              Total Projects
            </div>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              $
              {(
                data.revenueData.reduce((sum, item) => sum + item.revenue, 0) /
                data.revenueData.reduce((sum, item) => sum + item.projects, 0)
              ).toFixed(0)}
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
              Avg per Project
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render platform stats (pie chart simulation)
  const renderPlatformChart = () => {
    const totalClients = data.platformStats.reduce(
      (sum, item) => sum + item.clients,
      0
    );
    const totalRevenue = data.platformStats.reduce(
      (sum, item) => sum + item.revenue,
      0
    );

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Pie Chart Simulation */}
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 rounded-full border-8 border-blue-500"></div>
            <div className="absolute inset-0 rounded-full border-8 border-green-500 transform -rotate-45"></div>
            <div className="absolute inset-0 rounded-full border-8 border-purple-500 transform -rotate-90"></div>
            <div className="absolute inset-0 rounded-full border-8 border-yellow-500 transform -rotate-135"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm font-bold text-gray-900 dark:text-white">
                  {totalClients}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Clients
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {data.platformStats.map((platform, index) => {
              const colors = ["blue", "green", "purple", "yellow"];
              const color = colors[index] || "gray";

              return (
                <div
                  key={platform.platform}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 bg-${color}-500 rounded`}></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {platform.platform}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {platform.clients} clients
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      ${platform.revenue.toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalClients}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              Total Clients
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${(totalRevenue / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 font-medium">
              Total Revenue
            </div>
          </div>
        </div>

        {/* Platform Performance */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            Platform Performance
          </h4>
          {data.platformStats.map((platform, index) => {
            const percentage = (
              (platform.revenue / totalRevenue) *
              100
            ).toFixed(1);
            return (
              <div
                key={platform.platform}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {platform.platform}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                    {percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderActiveChart = () => {
    switch (activeChart) {
      case "revenue":
        return renderRevenueChart();
      case "clients":
        return renderPlatformChart();
      default:
        return renderRevenueChart();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      {/* Chart Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="flex items-center space-x-3 mb-4 lg:mb-0">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <FaChartBar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Analytics & Insights
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Visualize your business performance and trends
            </p>
          </div>
        </div>

        {/* Chart Type Selector */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {Object.entries(chartConfigs).map(([key, config]) => {
            const Icon = config.icon;
            const isActive = activeChart === key;

            return (
              <button
                key={key}
                onClick={() => setActiveChart(key)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                  isActive
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{config.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Content */}
      <div className="min-h-[300px]">{renderActiveChart()}</div>

      {/* Chart Footer */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>
            Data updated: {new Date().toLocaleDateString()} •{" "}
            {filters.dateRange === "custom"
              ? `Custom range: ${filters.startDate} to ${filters.endDate}`
              : `Date range: ${filters.dateRange}`}
          </div>
          <div className="mt-2 sm:mt-0">
            Showing data for{" "}
            {filters.client === "all" ? "all clients" : "selected client"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCharts;
