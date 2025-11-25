// src/pages/Settings.jsx
import { useState, useEffect } from "react";
import {
  FaSave,
  FaUser,
  FaBuilding,
  FaBell,
  FaUsers,
  FaDownload,
  FaPalette,
  FaShieldAlt,
} from "react-icons/fa";

// Import components we'll create
import ProfileSettings from "../components/Settings/ProfileSettings";
import CompanySettings from "../components/Settings/CompanySettings";
import NotificationSettings from "../components/Settings/NotificationSettings";
import TeamManagement from "../components/Settings/TeamManagement";
import DataExport from "../components/Settings/DataExport";
import ThemeSettings from "../components/Settings/ThemeSettings";
import SecuritySettings from "../components/Settings/SecuritySettings";
import { toast } from "react-toastify";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({});

  // Mock settings data - replace with API calls
  useEffect(() => {
    const mockSettings = {
      profile: {
        name: "John Doe",
        email: "john.doe@company.com",
        phone: "+1-555-0101",
        position: "CEO",
        department: "Management",
        bio: "Founder and CEO of the company with 10+ years of experience in client management.",
        avatar: "JD",
      },
      company: {
        name: "TechCorp Inc",
        logo: "",
        industry: "Technology",
        website: "https://techcorp.com",
        address: "123 Business Ave, New York, NY 10001",
        phone: "+1-555-0000",
        email: "info@techcorp.com",
        taxId: "12-3456789",
      },
      notifications: {
        emailNotifications: true,
        inAppNotifications: true,
        followUpReminders: true,
        projectUpdates: true,
        teamActivity: false,
        weeklyReports: true,
        marketingEmails: false,
        securityAlerts: true,
      },
      theme: {
        mode: "light",
        primaryColor: "blue",
        sidebarStyle: "expanded",
        density: "comfortable",
      },
      security: {
        twoFactorAuth: false,
        sessionTimeout: 60,
        passwordExpiry: 90,
        loginAlerts: true,
        ipWhitelist: [],
      },
    };

    setTimeout(() => {
      setSettings(mockSettings);
      setLoading(false);
      toast.success("Settings loaded successfully!");
    }, 1000);
  }, []);

  // Handle settings update
  const handleUpdateSettings = (section, data) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
    toast.success(
      `${section.charAt(0).toUpperCase() + section.slice(1)} settings updated!`
    );
  };

  // Handle data export
  const handleExportData = (format, dataType) => {
    toast.info(`Exporting ${dataType} as ${format.toUpperCase()}...`);

    setTimeout(() => {
      toast.success(`${format.toUpperCase()} export completed!`);
      // In real app, this would trigger download
      const link = document.createElement("a");
      link.download = `${dataType}-export-${
        new Date().toISOString().split("T")[0]
      }.${format}`;
      link.href = "#";
      link.click();
    }, 2000);
  };

  // Save all settings
  const handleSaveAll = () => {
    toast.info("Saving all settings...");

    setTimeout(() => {
      toast.success("All settings saved successfully!");
    }, 1500);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "company", label: "Company", icon: FaBuilding },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "team", label: "Team", icon: FaUsers },
    { id: "theme", label: "Theme", icon: FaPalette },
    { id: "security", label: "Security", icon: FaShieldAlt },
    { id: "export", label: "Data Export", icon: FaDownload },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileSettings
            data={settings.profile}
            onUpdate={(data) => handleUpdateSettings("profile", data)}
          />
        );
      case "company":
        return (
          <CompanySettings
            data={settings.company}
            onUpdate={(data) => handleUpdateSettings("company", data)}
          />
        );
      case "notifications":
        return (
          <NotificationSettings
            data={settings.notifications}
            onUpdate={(data) => handleUpdateSettings("notifications", data)}
          />
        );
      case "team":
        return <TeamManagement />;
      case "theme":
        return (
          <ThemeSettings
            data={settings.theme}
            onUpdate={(data) => handleUpdateSettings("theme", data)}
          />
        );
      case "security":
        return (
          <SecuritySettings
            data={settings.security}
            onUpdate={(data) => handleUpdateSettings("security", data)}
          />
        );
      case "export":
        return <DataExport onExport={handleExportData} />;
      default:
        return (
          <ProfileSettings
            data={settings.profile}
            onUpdate={(data) => handleUpdateSettings("profile", data)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
              Settings & Preferences
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Personalize and manage system behavior and preferences
            </p>
          </div>

          <div className="flex flex-col xs:flex-row gap-3">
            <button
              onClick={handleSaveAll}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 min-w-[120px]"
            >
              <FaSave className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Save All</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <nav className="p-4 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition duration-200 ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-400"
                      }`}
                    />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            {renderActiveTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
