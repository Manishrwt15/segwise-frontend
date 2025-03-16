import React from "react";

type FullModalProps = {
  data: any;
  onClose: () => void;
};

const FullModal: React.FC<FullModalProps> = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div className="bg-gray-100 p-6 rounded-lg max-w-4xl w-[90%] sm:w-[85%] md:w-[80%] shadow-xl border border-lime-400 ring-2 ring-lime-300/50 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3 mb-3">
          <h2 className="text-xl font-bold text-lime-600">{data.creative_name}</h2>
        </div>

        <div className="space-y-3 text-sm text-gray-700">
          <p><span className="font-semibold">Country:</span> {data.country}</p>
          <p><span className="font-semibold">OS:</span> {data.os}</p>
          <p><span className="font-semibold">Ad Network:</span> {data.ad_network}</p>
          <p><span className="font-semibold">Campaign:</span> {data.campaign}</p>
          <p><span className="font-semibold">Ad Group:</span> {data.ad_group}</p>
          <p><span className="font-semibold">IPM:</span> {data.ipm}</p>
          <p><span className="font-semibold">CTR:</span> {data.ctr}%</p>
          <p><span className="font-semibold">Spend:</span> ${data.spend.toLocaleString()}</p>
          <p><span className="font-semibold">Impressions:</span> {data.impressions.toLocaleString()}</p>
          <p><span className="font-semibold">Clicks:</span> {data.clicks.toLocaleString()}</p>
          <p><span className="font-semibold">CPM:</span> ${data.cpm.toFixed(2)}</p>
          <p><span className="font-semibold">Cost Per Click:</span> ${data.cost_per_click.toFixed(2)}</p>
          <p><span className="font-semibold">Cost Per Install:</span> ${data.cost_per_install.toFixed(2)}</p>
          <p><span className="font-semibold">Installs:</span> {data.installs.toLocaleString()}</p>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullModal;

