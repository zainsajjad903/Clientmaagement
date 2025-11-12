// components/Dashboard/ClientPipeline.jsx
const ClientPipeline = () => {
  const pipelineStages = [
    { stage: "Lead", count: 12, color: "bg-gray-400", value: "$12K" },
    { stage: "Proposal", count: 8, color: "bg-blue-400", value: "$45K" },
    { stage: "Discussion", count: 15, color: "bg-yellow-400", value: "$78K" },
    { stage: "Negotiation", count: 6, color: "bg-orange-400", value: "$32K" },
    { stage: "Won", count: 9, color: "bg-green-400", value: "$120K" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Client Pipeline
      </h3>

      <div className="space-y-4">
        {pipelineStages.map((stage, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {stage.stage}
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {stage.count} clients
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 block">
                {stage.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Total Pipeline Value
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            $287,000
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClientPipeline;
