// src/pages/Reports.jsx
import { useState, useEffect } from "react";
import {
  FaDownload,
  FaFilePdf,
  FaFileExcel,
  FaFilter,
  FaCalendarAlt,
  FaChartBar,
  FaUsers,
  FaMoneyBillWave,
  FaProjectDiagram,
  FaClipboardList,
} from "react-icons/fa";

// Import components we'll create
import ReportFilters from "../components/Reports/ReportFilters";
import ReportStats from "../components/Reports/ReportStats";
import ReportCharts from "../components/Reports/ReportCharts";
import ReportExport from "../components/Reports/ReportExport";
import { toast } from "react-toastify";

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [filters, setFilters] = useState({
    reportType: "client-list",
    dateRange: "month",
    startDate: "",
    endDate: "",
    client: "all",
    status: "all",
  });

  // Mock report data - replace with API calls
  useEffect(() => {
    const loadReportData = () => {
      const mockData = {
        summary: {
          totalClients: 24,
          activeProjects: 12,
          completedProjects: 8,
          totalRevenue: 125000,
          conversionRate: 35,
          avgProjectValue: 10416,
        },
        clientList: [
          {
            id: 1,
            name: "Sarah Johnson",
            company: "TechCorp Inc",
            email: "sarah@techcorp.com",
            phone: "+1-555-0101",
            status: "active",
            totalProjects: 3,
            totalRevenue: 45000,
            lastContact: "2024-01-15",
            joinDate: "2023-08-10",
          },
          {
            id: 2,
            name: "Mike Thompson",
            company: "Design Studio LLC",
            email: "mike@designstudio.com",
            phone: "+1-555-0102",
            status: "active",
            totalProjects: 2,
            totalRevenue: 28000,
            lastContact: "2024-01-14",
            joinDate: "2023-09-15",
          },
          {
            id: 3,
            name: "Emily Davis",
            company: "Startup Innovations",
            email: "emily@startup.com",
            phone: "+1-555-0103",
            status: "lead",
            totalProjects: 0,
            totalRevenue: 0,
            lastContact: "2024-01-18",
            joinDate: "2024-01-05",
          },
          {
            id: 4,
            name: "Robert Wilson",
            company: "Business Consulting Co",
            email: "robert@bcc.com",
            phone: "+1-555-0104",
            status: "active",
            totalProjects: 1,
            totalRevenue: 15000,
            lastContact: "2024-01-16",
            joinDate: "2023-11-20",
          },
          {
            id: 5,
            name: "Lisa Chen",
            company: "Digital Agency Partners",
            email: "lisa@digitalpartners.com",
            phone: "+1-555-0105",
            status: "inactive",
            totalProjects: 4,
            totalRevenue: 62000,
            lastContact: "2024-01-11",
            joinDate: "2023-07-01",
          },
        ],
        revenueData: [
          { month: "Jan", revenue: 45000, projects: 4 },
          { month: "Feb", revenue: 52000, projects: 5 },
          { month: "Mar", revenue: 38000, projects: 3 },
          { month: "Apr", revenue: 61000, projects: 6 },
          { month: "May", revenue: 49000, projects: 4 },
          { month: "Jun", revenue: 55000, projects: 5 },
        ],
        pipelineSummary: {
          lead: 8,
          proposal: 4,
          discussion: 3,
          negotiation: 2,
          ongoing: 12,
          completed: 8,
          lost: 3,
        },
        platformStats: [
          { platform: "Upwork", clients: 12, revenue: 85000 },
          { platform: "Fiverr", clients: 6, revenue: 25000 },
          { platform: "Direct", clients: 4, revenue: 12000 },
          { platform: "Referral", clients: 2, revenue: 3000 },
        ],
      };

      setTimeout(() => {
        setReportData(mockData);
        setLoading(false);
        toast.success("Reports data loaded successfully!");
      }, 1500);
    };

    loadReportData();
  }, []);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // In real app, this would trigger API call with new filters
    toast.info("Applying filters...");

    // Simulate API call delay
    setTimeout(() => {
      toast.success("Report updated with new filters!");
    }, 1000);
  };

  // Handle export
  const handleExport = (format, reportType) => {
    toast.info(
      `Generating ${format.toUpperCase()} export for ${reportType}...`
    );

    // Simulate export generation
    setTimeout(() => {
      toast.success(`${format.toUpperCase()} report exported successfully!`);

      // In real app, this would trigger download
      const link = document.createElement("a");
      link.download = `${reportType}-report-${
        new Date().toISOString().split("T")[0]
      }.${format}`;
      link.href = "#";
      link.click();
    }, 2000);
  };

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
              Reports & Insights
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Generate summaries and analytics for review or presentations
            </p>
          </div>

          <div className="flex flex-col xs:flex-row gap-3">
            <ReportExport onExport={handleExport} />
          </div>
        </div>
      </div>

      {/* Report Statistics */}
      <ReportStats data={reportData.summary} />

      {/* Filters Section */}
      <ReportFilters filters={filters} onFiltersChange={handleFilterChange} />

      {/* Charts and Visualizations */}
      <ReportCharts data={reportData} filters={filters} />

      {/* Report Data Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {filters.reportType === "client-list" && "Client List"}
                {filters.reportType === "revenue" && "Revenue Report"}
                {filters.reportType === "pipeline" && "Pipeline Summary"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {reportData.clientList.length} records found
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Client
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contact
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Projects
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Revenue
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Contact
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {reportData.clientList.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {client.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {client.company}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {client.email}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {client.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        client.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : client.status === "lead"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900 dark:text-white">
                    {client.totalProjects}
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      ${client.totalRevenue.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(client.lastContact).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {reportData.clientList.length} of{" "}
              {reportData.clientList.length} clients
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 text-sm bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-50 dark:hover:bg-gray-500"
                disabled
              >
                Previous
              </button>
              <button
                className="px-3 py-1 text-sm bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-50 dark:hover:bg-gray-500"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
