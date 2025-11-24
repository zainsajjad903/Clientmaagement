// AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import ClientManagement from "../pages/ClientManagement.jsx";
import Communication from "../pages/Communication.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Followups from "../pages/Followups.jsx";
import Notifications from "../pages/Notifications.jsx";
import Settings from "../pages/Settings.jsx";
import Team from "../pages/Team.jsx";
import Reports from "../pages/Reports.jsx";
import Documents from "../pages/Documents.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/clients" element={<ClientManagement />} />
      <Route path="/communication" element={<Communication />} />
      <Route path="/followups" element={<Followups />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/team" element={<Team />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/documents" element={<Documents />} />
    </Routes>
  );
}
