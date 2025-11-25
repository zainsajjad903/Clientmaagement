import React, { useState } from "react";

const ThemeSettings = () => {
  const [theme, setTheme] = useState("light");
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    logo: null,
  });
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In a real app, you would upload to cloud storage
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompanyInfo({ ...companyInfo, logo: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save theme settings
    console.log("Saving theme settings:", { theme, companyInfo, primaryColor });
    alert("Theme settings saved successfully!");
  };

  const presetColors = [
    "#3B82F6", // Blue
    "#EF4444", // Red
    "#10B981", // Green
    "#8B5CF6", // Purple
    "#F59E0B", // Amber
    "#EC4899", // Pink
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Theme & Branding</h2>

      <div className="space-y-6">
        {/* Company Branding */}
        <div>
          <h3 className="text-lg font-medium mb-4">Company Branding</h3>

          {/* Logo Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Logo
            </label>
            <div className="flex items-center gap-4">
              {companyInfo.logo && (
                <div className="w-16 h-16 border rounded-lg overflow-hidden">
                  <img
                    src={companyInfo.logo}
                    alt="Company Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Upload Logo
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 200x200px PNG or SVG
                </p>
              </div>
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={companyInfo.name}
              onChange={(e) =>
                setCompanyInfo({ ...companyInfo, name: e.target.value })
              }
              placeholder="Enter your company name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Theme Selection */}
        <div>
          <h3 className="text-lg font-medium mb-4">Theme Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <button
              onClick={() => setTheme("light")}
              className={`p-4 border-2 rounded-lg text-left ${
                theme === "light"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="font-medium">Light Theme</div>
              <div className="text-sm text-gray-500 mt-1">
                Clean, bright interface
              </div>
            </button>

            <button
              onClick={() => setTheme("dark")}
              className={`p-4 border-2 rounded-lg text-left ${
                theme === "dark"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="font-medium">Dark Theme</div>
              <div className="text-sm text-gray-500 mt-1">Easy on the eyes</div>
            </button>

            <button
              onClick={() => setTheme("auto")}
              className={`p-4 border-2 rounded-lg text-left ${
                theme === "auto"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="font-medium">Auto</div>
              <div className="text-sm text-gray-500 mt-1">
                Follows system preference
              </div>
            </button>
          </div>
        </div>

        {/* Primary Color */}
        <div>
          <h3 className="text-lg font-medium mb-4">Primary Color</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => setPrimaryColor(color)}
                className={`w-10 h-10 rounded-full border-2 ${
                  primaryColor === color ? "border-gray-800" : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-16 h-10 cursor-pointer"
            />
            <span className="text-sm text-gray-600">{primaryColor}</span>
          </div>
        </div>

        {/* Preview Section */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="font-medium mb-3">Preview</h4>
          <div className="flex gap-2">
            <div
              className="px-3 py-1 text-white rounded"
              style={{ backgroundColor: primaryColor }}
            >
              Button
            </div>
            <div
              className="px-3 py-1 border rounded"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Outline
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          >
            Save Theme Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
