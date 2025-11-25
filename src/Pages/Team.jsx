// src/pages/Team.jsx
import { useState, useEffect } from "react";
import {
  FaPlus,
  // FaSearch,
  // FaFilter,
  // FaEnvelope,
  // FaEdit,
  // FaTrash,
  // FaUser,
  // FaUserShield,
  // FaUserCheck,
  // FaUserClock,
  // FaPhone,
  // FaMapMarkerAlt,
  // FaCalendarAlt,
} from "react-icons/fa";

// Import components we'll create
import TeamStats from "../components/Team/TeamStats";
import TeamFilters from "../components/Team/TeamFilters";
import TeamList from "../components/Team/TeamList";
import TeamInviteForm from "../components/Team/TeamInviteForm";
import { toast } from "react-toastify";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    role: "all",
    status: "all",
  });

  // Mock data - replace with API calls
  useEffect(() => {
    const mockTeamMembers = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@company.com",
        phone: "+1-555-0101",
        role: "admin",
        status: "active",
        avatar: "JD",
        joinDate: "2023-01-15",
        lastActive: "2024-01-20T14:30:00",
        assignedClients: 12,
        completedProjects: 24,
        department: "Management",
        location: "New York, USA",
        permissions: ["all"],
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@company.com",
        phone: "+1-555-0102",
        role: "manager",
        status: "active",
        avatar: "JS",
        joinDate: "2023-03-10",
        lastActive: "2024-01-20T12:15:00",
        assignedClients: 8,
        completedProjects: 18,
        department: "Sales",
        location: "Chicago, USA",
        permissions: ["clients", "projects", "reports"],
      },
      {
        id: 3,
        name: "Mike Johnson",
        email: "mike.johnson@company.com",
        phone: "+1-555-0103",
        role: "member",
        status: "active",
        avatar: "MJ",
        joinDate: "2023-05-20",
        lastActive: "2024-01-19T16:45:00",
        assignedClients: 6,
        completedProjects: 15,
        department: "Development",
        location: "Remote",
        permissions: ["clients", "projects"],
      },
      {
        id: 4,
        name: "Sarah Wilson",
        email: "sarah.wilson@company.com",
        phone: "+1-555-0104",
        role: "member",
        status: "active",
        avatar: "SW",
        joinDate: "2023-07-12",
        lastActive: "2024-01-20T09:20:00",
        assignedClients: 5,
        completedProjects: 12,
        department: "Design",
        location: "Los Angeles, USA",
        permissions: ["clients", "projects"],
      },
      {
        id: 5,
        name: "David Brown",
        email: "david.brown@company.com",
        phone: "+1-555-0105",
        role: "viewer",
        status: "active",
        avatar: "DB",
        joinDate: "2023-09-05",
        lastActive: "2024-01-18T11:30:00",
        assignedClients: 0,
        completedProjects: 0,
        department: "Marketing",
        location: "Remote",
        permissions: ["view_only"],
      },
      {
        id: 6,
        name: "Emily Davis",
        email: "emily.davis@company.com",
        phone: "+1-555-0106",
        role: "member",
        status: "pending",
        avatar: "ED",
        joinDate: "2024-01-10",
        lastActive: "2024-01-10T10:00:00",
        assignedClients: 0,
        completedProjects: 0,
        department: "Support",
        location: "Boston, USA",
        permissions: ["clients"],
      },
    ];

    setTimeout(() => {
      setTeamMembers(mockTeamMembers);
      setLoading(false);
      toast.success("Team members loaded successfully!");
    }, 1000);
  }, []);

  // Invite new team member
  const handleInviteMember = (memberData) => {
    const newMember = {
      id: Date.now(),
      ...memberData,
      status: "pending",
      joinDate: new Date().toISOString().split("T")[0],
      lastActive: new Date().toISOString(),
      assignedClients: 0,
      completedProjects: 0,
      avatar: memberData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    };
    setTeamMembers([newMember, ...teamMembers]);
    setShowInviteForm(false);
    toast.success(`Invitation sent to ${memberData.name}!`);
  };

  // Update team member
  const handleUpdateMember = (memberData) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === editingMember.id
          ? {
              ...member,
              ...memberData,
              updatedAt: new Date().toISOString(),
            }
          : member
      )
    );
    setEditingMember(null);
    setShowInviteForm(false);
    toast.success("Team member updated successfully!");
  };

  // Delete team member
  const handleDeleteMember = (memberId) => {
    const memberToDelete = teamMembers.find((member) => member.id === memberId);

    const confirmDelete = () => {
      setTeamMembers(teamMembers.filter((member) => member.id !== memberId));
      toast.success(`Team member removed successfully!`);
    };

    toast.info(
      <div className="p-4">
        <div className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Remove Team Member?
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Are you sure you want to remove {memberToDelete?.name} from the team?
          This action cannot be undone.
        </p>
        <div className="flex space-x-3 justify-end">
          <button
            onClick={() => {
              toast.dismiss();
              confirmDelete();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
          >
            Remove
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  // Resend invitation
  const handleResendInvitation = (member) => {
    toast.info(`Sending invitation to ${member.email}...`);

    setTimeout(() => {
      toast.success(`Invitation sent to ${member.email}!`);
    }, 1500);
  };

  // Filter team members
  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      member.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      member.department.toLowerCase().includes(filters.search.toLowerCase());

    const matchesRole = filters.role === "all" || member.role === filters.role;

    const matchesStatus =
      filters.status === "all" || member.status === filters.status;

    return matchesSearch && matchesRole && matchesStatus;
  });

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
              Team Collaboration
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage team members, roles, and permissions - {teamMembers.length}{" "}
              team members
            </p>
          </div>

          <div className="flex flex-col xs:flex-row gap-3">
            <button
              onClick={() => setShowInviteForm(true)}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 min-w-[120px]"
            >
              <FaPlus className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Invite Member</span>
            </button>
          </div>
        </div>
      </div>

      {/* Team Statistics */}
      <TeamStats members={teamMembers} />

      {/* Filters Section */}
      <TeamFilters filters={filters} onFiltersChange={setFilters} />

      {/* Team Members List */}
      <TeamList
        members={filteredMembers}
        onEditMember={(member) => {
          setEditingMember(member);
          setShowInviteForm(true);
        }}
        onDeleteMember={handleDeleteMember}
        onResendInvitation={handleResendInvitation}
      />

      {/* Team Invite/Edit Form Modal */}
      {showInviteForm && (
        <TeamInviteForm
          member={editingMember}
          onSave={editingMember ? handleUpdateMember : handleInviteMember}
          onClose={() => {
            setShowInviteForm(false);
            setEditingMember(null);
          }}
        />
      )}
    </div>
  );
};

export default Team;
