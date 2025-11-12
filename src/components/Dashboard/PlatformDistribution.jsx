// components/Dashboard/PlatformDistribution.jsx
const PlatformDistribution = () => {
  const platforms = [
    { name: "Upwork", clients: 45, percentage: 35, color: "bg-green-500" },
    { name: "Fiverr", clients: 32, percentage: 25, color: "bg-blue-500" },
    { name: "Freelancer", clients: 28, percentage: 22, color: "bg-purple-500" },
    { name: "Direct", clients: 15, percentage: 12, color: "bg-orange-500" },
    { name: "Referral", clients: 8, percentage: 6, color: "bg-red-500" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Client Sources
      </h3>

      <div className="space-y-3">
        {platforms.map((platform, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">
                {platform.name}
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                {platform.clients} clients ({platform.percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${platform.color}`}
                style={{ width: `${platform.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformDistribution;
