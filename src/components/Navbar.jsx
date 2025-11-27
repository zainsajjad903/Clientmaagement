import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";

// Firebase imports
import { db } from "../firebase"; // apne project ke hisaab se path adjust kar sakte ho
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]); // ✅ ab state se aayega
  const location = useLocation();

  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);

  // ---------- helpers ----------

  const getPageTitle = () => {
    const path = location.pathname;
    const titles = {
      "/": "Dashboard",
      "/clients": "Client Management",
      "/communication": "Communication Log",
      "/followups": "Follow-up System",
      "/documents": "Document Management",
      "/pipeline": "Project Pipeline",
      "/reports": "Reports & Analytics",
      "/team": "Team Collaboration",
      "/settings": "Settings & Preferences",
    };
    return titles[path] || "Dashboard";
  };

  const getRelativeTime = (date) => {
    if (!date) return "";
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const toJsDate = (value, fallback = new Date()) => {
    if (!value) return fallback;
    // Firestore Timestamp
    if (value.seconds) {
      return new Date(value.seconds * 1000);
    }
    // ISO string / millis
    try {
      const d = new Date(value);
      if (!isNaN(d.getTime())) return d;
      return fallback;
    } catch {
      return fallback;
    }
  };

  const mergeAndSortNotifications = (items) => {
    return items
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 20)
      .map((n) => ({
        ...n,
        unread: true, // filhal sab ko unread rakhen ge
      }));
  };

  // ---------- outside click handling ----------

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------- dark mode ----------

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // TODO: implement actual search
    }
  };

  // ---------- Firestore notifications ----------

  useEffect(() => {
    // communications (latest)
    const commRef = collection(db, "communications");
    const commQuery = query(commRef, orderBy("createdAt", "desc"), limit(10));

    const unsubComm = onSnapshot(commQuery, (snapshot) => {
      const commNotifs = snapshot.docs.map((doc) => {
        const data = doc.data() || {};
        const clientName = data.client?.name || "Client";
        const createdAt = data.createdAt
          ? toJsDate(data.createdAt)
          : data.date
          ? toJsDate(data.date)
          : new Date();

        return {
          id: `comm-${doc.id}`,
          type: "communication",
          message:
            data.subject && clientName
              ? `${clientName}: ${data.subject}`
              : "New communication logged",
          time: getRelativeTime(createdAt),
          createdAt,
        };
      });

      setNotifications((prev) => {
        const others = prev.filter((n) => !n.id.startsWith("comm-"));
        return mergeAndSortNotifications([...others, ...commNotifs]);
      });
    });

    // followups (latest)
    const followRef = collection(db, "followups");
    const followQuery = query(followRef, orderBy("dueDate", "desc"), limit(10));

    const unsubFollow = onSnapshot(followQuery, (snapshot) => {
      const followNotifs = snapshot.docs.map((doc) => {
        const data = doc.data() || {};
        const clientName = data.client?.name || "Client";
        const dueDate = data.dueDate ? toJsDate(data.dueDate) : new Date();

        return {
          id: `follow-${doc.id}`,
          type: "followup",
          message: `Follow-up with ${clientName} due ${dueDate.toLocaleDateString()}`,
          time: getRelativeTime(dueDate),
          createdAt: dueDate,
        };
      });

      setNotifications((prev) => {
        const others = prev.filter((n) => !n.id.startsWith("follow-"));
        return mergeAndSortNotifications([...others, ...followNotifs]);
      });
    });

    return () => {
      unsubComm();
      unsubFollow();
    };
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Page Title */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {getPageTitle()}
            </h1>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients, projects, documents..."
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </form>
          </div>

          {/* Right: User Controls */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-200"
              title={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? (
                <FaSun className="h-5 w-5" />
              ) : (
                <FaMoon className="h-5 w-5" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-200 relative"
              >
                <FaBell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Notifications
                      </h3>
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                        {unreadCount} new
                      </span>
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition duration-150 ${
                            notification.unread
                              ? "bg-blue-50 dark:bg-blue-900/20"
                              : ""
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`p-2 rounded-full ${
                                notification.unread
                                  ? "bg-blue-100 dark:bg-blue-800"
                                  : "bg-gray-100 dark:bg-gray-700"
                              }`}
                            >
                              <FaBell
                                className={`h-4 w-4 ${
                                  notification.unread
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-500 dark:text-gray-400"
                                }`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                    <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium py-2 transition duration-200">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                  JD
                </div>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        JD
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          John Doe
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          john.doe@clientflow.com
                        </p>
                        <span className="inline-block mt-1 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                          Admin
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                      <FaUserCircle className="h-4 w-4 mr-3 text-gray-400" />
                      Your Profile
                    </button>

                    <button className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                      <FaCog className="h-4 w-4 mr-3 text-gray-400" />
                      Settings
                    </button>

                    <button className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                      <FaEnvelope className="h-4 w-4 mr-3 text-gray-400" />
                      Messages
                    </button>

                    <button className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                      <FaCalendarAlt className="h-4 w-4 mr-3 text-gray-400" />
                      Calendar
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                    <button className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                      <FaSignOutAlt className="h-4 w-4 mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
