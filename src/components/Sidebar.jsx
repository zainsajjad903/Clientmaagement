import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaRegCommentDots,
  FaBell,
  FaFileAlt,
  FaProjectDiagram,
  FaChartBar,
  FaCog,
  FaUserFriends,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();

  // Logo component
  const Logo = () => (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-sm">CF</span>
      </div>
      {!isCollapsed && (
        <div className="flex flex-col">
          <span className="text-white font-bold text-lg tracking-tight">
            ClientFlow
          </span>
          <span className="text-blue-200 text-xs">Professional</span>
        </div>
      )}
    </div>
  );

  // Navigation items data
  const navItems = [
    { path: "/", icon: FaTachometerAlt, label: "Dashboard" },
    { path: "/clients", icon: FaUsers, label: "Clients" },
    { path: "/communication", icon: FaRegCommentDots, label: "Communication" },
    { path: "/followups", icon: FaBell, label: "Follow-ups" },
    { path: "/documents", icon: FaFileAlt, label: "Documents" },
    { path: "/pipeline", icon: FaProjectDiagram, label: "Pipeline" },
    { path: "/reports", icon: FaChartBar, label: "Reports" },
    { path: "/team", icon: FaUserFriends, label: "Team" },
    { path: "/settings", icon: FaCog, label: "Settings" },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 text-white h-screen fixed transition-all duration-300 z-50 shadow-2xl flex flex-col`}
    >
      {/* Header with Logo - Fixed height */}
      <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-700 h-20">
        <Logo />
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white p-2 hover:bg-gray-700 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          {isCollapsed ? (
            <FaChevronRight size={14} />
          ) : (
            <FaChevronLeft size={14} />
          )}
        </button>
      </div>

      {/* Navigation - Scrollable area with fixed height */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav>
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <div
                      className={`relative ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    >
                      <Icon className="text-lg" />
                      {isActive && (
                        <div className="absolute -right-1 -top-1 w-2 h-2 bg-blue-400 rounded-full"></div>
                      )}
                    </div>
                    {!isCollapsed && (
                      <span className="font-medium tracking-wide">
                        {item.label}
                      </span>
                    )}
                    {isCollapsed && (
                      <div className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-lg pointer-events-none">
                        {item.label}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom Section - Fixed height */}
      <div className="flex-shrink-0 border-t border-gray-700 pt-4 pb-6 px-3">
        {/* Upgrade Card - Only show when expanded */}
        {!isCollapsed && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 mb-4 shadow-lg">
            <div className="text-white text-sm font-semibold mb-1">
              Upgrade to Pro
            </div>
            <div className="text-blue-100 text-xs mb-3">
              Get advanced features
            </div>
            <button className="w-full bg-white text-blue-600 text-xs font-bold py-2 rounded-lg hover:bg-blue-50 transition duration-200">
              Upgrade Now
            </button>
          </div>
        )}

        {/* Settings Link
        <Link
          to="/settings"
          className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
            location.pathname === "/settings"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          <FaCog className="text-lg" />
          {!isCollapsed && (
            <span className="font-medium tracking-wide">Settings</span>
          )}
        </Link> */}

        {/* Version Info */}
        <div className="text-center mt-4">
          {!isCollapsed ? (
            <div className="text-gray-400 text-xs">
              <div>ClientFlow v2.0</div>
              <div className="text-gray-500 mt-1">
                © 2024 All rights reserved
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-xs">v2.0</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
