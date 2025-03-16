import React from "react";

type PreviewBoxProps = {
  data: any;
  onClose: () => void;
  onExpand: () => void;
};

const PreviewBox: React.FC<PreviewBoxProps> = ({ data, onClose, onExpand }) => {
  if (!data) return null;

  return (
    <div className="fixed bottom-4 right-4 w-72 bg-gray-100 shadow-lg rounded-lg p-4 border border-lime-400">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-lime-600">{data.creative_name}</h3>
        <button
          onClick={onClose}
          className="text-red-500 text-sm p-1 rounded-full transition-all cursor-pointer"
        >
          ✖
        </button>
      </div>
      <p className="text-xs text-gray-700">Country: {data.country}</p>
      <p className="text-xs text-gray-700">OS: {data.os}</p>
      <p className="text-xs text-gray-700">Ad Network: {data.ad_network}</p>
      <button
        onClick={onExpand}
        className="mt-2 w-full bg-lime-500 text-white text-xs p-2 rounded hover:bg-lime-600 transition-all"
      >
        Expand View
      </button>
    </div>
  );
};

export default PreviewBox;
