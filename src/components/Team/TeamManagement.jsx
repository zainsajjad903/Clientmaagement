import React, { useState } from "react";

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Team Member",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Viewer",
      status: "Pending",
    },
  ]);

  const [inviteEmail, setInviteEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("Team Member");

  const handleInviteMember = () => {
    if (inviteEmail) {
      const newMember = {
        id: teamMembers.length + 1,
        name: "New User",
        email: inviteEmail,
        role: selectedRole,
        status: "Pending",
      };
      setTeamMembers([...teamMembers, newMember]);
      setInviteEmail("");
      // Here you would typically send an API request to invite the user
    }
  };

  const handleRemoveMember = (id) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  const handleRoleChange = (id, newRole) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === id ? { ...member, role: newRole } : member
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Team Management</h2>

      {/* Invite Team Member Section */}
      <div className="mb-8 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Invite Team Member</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter email address"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Admin">Admin</option>
            <option value="Team Member">Team Member</option>
            <option value="Viewer">Viewer</option>
          </select>
          <button
            onClick={handleInviteMember}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Invite
          </button>
        </div>
      </div>

      {/* Team Members List */}
      <div>
        <h3 className="text-lg font-medium mb-4">Team Members</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      value={member.role}
                      onChange={(e) =>
                        handleRoleChange(member.id, e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Team Member">Team Member</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Activity Log Section */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Team Activity Log</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">
            Activity log showing who did what will appear here.
          </p>
          {/* This would be populated with actual activity data */}
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
