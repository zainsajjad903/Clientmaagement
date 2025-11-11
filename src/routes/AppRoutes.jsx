// AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Clients from "../pages/Clients.jsx";
import Communication from "../pages/Communication";
import Dashboard from "../pages/Dashboard";
import Followups from "../pages/Followups.jsx";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import Team from "../pages/Team";
import Reports from "../pages/Reports";
import Documents from "../pages/Documents";
import { PiPackage } from "react-icons/pi";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/communication" element={<Communication />} />
      <Route path="/followups" element={<Followups />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/team" element={<Team />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/pipeline" element={<PiPackage />} />
    </Routes>
  );
}
