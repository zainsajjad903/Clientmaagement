import React, { useState } from "react";

const CompanySettings = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: "Your Agency Name",
    email: "contact@youragency.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Street, City, State 12345",
    website: "www.youragency.com",
    industry: "Digital Agency",
    founded: "2020",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Save company info to backend
    alert("Company information updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form if needed
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Company Settings</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Edit Company Info
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={companyInfo.name}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <select
                value={companyInfo.industry}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, industry: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Digital Agency">Digital Agency</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Design Studio">Design Studio</option>
                <option value="Marketing Agency">Marketing Agency</option>
                <option value="Consulting">Consulting</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email *
              </label>
              <input
                type="email"
                value={companyInfo.email}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="company@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={companyInfo.phone}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="url"
              value={companyInfo.website}
              onChange={(e) =>
                setCompanyInfo({ ...companyInfo, website: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="www.example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Address
            </label>
            <textarea
              value={companyInfo.address}
              onChange={(e) =>
                setCompanyInfo({ ...companyInfo, address: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full company address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year Founded
              </label>
              <input
                type="number"
                value={companyInfo.founded}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, founded: e.target.value })
                }
                min="1900"
                max="2024"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2020"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="UTC-5">EST (UTC-5)</option>
                <option value="UTC-6">CST (UTC-6)</option>
                <option value="UTC-7">MST (UTC-7)</option>
                <option value="UTC-8">PST (UTC-8)</option>
                <option value="UTC+0">GMT (UTC+0)</option>
                <option value="UTC+1">CET (UTC+1)</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Company Details</h3>
              <div className="space-y-4">
                <div>
                  <span className="font-medium text-gray-700 block mb-1">
                    Company Name:
                  </span>
                  <p className="text-gray-900">{companyInfo.name}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700 block mb-1">
                    Industry:
                  </span>
                  <p className="text-gray-900">{companyInfo.industry}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700 block mb-1">
                    Contact Email:
                  </span>
                  <p className="text-gray-900">{companyInfo.email}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700 block mb-1">
                    Phone Number:
                  </span>
                  <p className="text-gray-900">{companyInfo.phone}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">
                Additional Information
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="font-medium text-gray-700 block mb-1">
                    Website:
                  </span>
                  <p className="text-gray-900">{companyInfo.website}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700 block mb-1">
                    Address:
                  </span>
                  <p className="text-gray-900 whitespace-pre-line">
                    {companyInfo.address}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700 block mb-1">
                    Founded:
                  </span>
                  <p className="text-gray-900">{companyInfo.founded}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700 block mb-1">
                    Timezone:
                  </span>
                  <p className="text-gray-900">EST (UTC-5)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Statistics */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-4">Company Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">24</div>
                <div className="text-sm text-blue-800">Team Members</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">156</div>
                <div className="text-sm text-green-800">Active Clients</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">42</div>
                <div className="text-sm text-purple-800">Projects</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">98%</div>
                <div className="text-sm text-orange-800">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanySettings;
