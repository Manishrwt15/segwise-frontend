import { useState, useRef, useEffect } from "react";
import { useFilterStore } from "../store/filterStore";
import { FaPlus, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Filters = ({ setFilterCount }: { setFilterCount: (count: number) => void }) => {
  const { setFilters, filters } = useFilterStore();
  const [newFilter, setNewFilter] = useState({ category: "", condition: "", value: "" });
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [inputError, setInputError] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const numericCategories = ["ipm", "ctr", "spend", "impressions", "clicks"];
  const stringCategories = ["country", "os", "ad_network", "campaign"];
  const allCategories = [...numericCategories, ...stringCategories];

  useEffect(() => {
    setFilterCount(filters.length);
  }, [filters, setFilterCount]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateInput = () => {
    if (numericCategories.includes(newFilter.category) && isNaN(Number(newFilter.value))) {
      setInputError("Please enter a valid number");
      return false;
    }
    return true;
  };

  const handleAddFilter = () => {
    if (!validateInput()) return;

    setFilters([...filters, newFilter]);
    setNewFilter({ category: "", condition: "", value: "" });
    setInputError("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="relative w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <div className="relative group" ref={dropdownRef}>
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="w-full flex justify-between items-center px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm 
             hover:border-lime-500 hover:shadow-md focus:ring-2 focus:ring-lime-200 transition-all duration-300"
            >
              {newFilter.category || "Select Category"}
              <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </button>

            <AnimatePresence>
              {showCategoryDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-xl border border-gray-200 max-h-60 overflow-y-auto"
                >
                  <div className="p-2 space-y-1">
                    {allCategories.map(category => (
                      <button
                        key={category}
                        className="block w-full text-left p-2 hover:bg-lime-50 rounded-md"
                        onClick={() => {
                          setNewFilter(prev => ({ ...prev, category }));
                          setShowCategoryDropdown(false);
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="relative w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
          <select
            className="w-full flex justify-between items-center px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm 
             hover:border-lime-500 hover:shadow-md focus:ring-2 focus:ring-lime-200 transition-all duration-300"
            value={newFilter.condition}
            onChange={e => setNewFilter(prev => ({ ...prev, condition: e.target.value }))}
          >
            <option value="">Select Condition</option>
            {numericCategories.includes(newFilter.category) ? (
              <>
                <option value="greater_than">Greater Than</option>
                <option value="less_than">Less Than</option>
                <option value="equals">Equals</option>
              </>
            ) : (
              <>
                <option value="is">Is</option>
                <option value="is_not">Is Not</option>
                <option value="contains">Contains</option>
              </>
            )}
          </select>
        </div>

        <div className="relative w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-lime-200 transition-all duration-300"
            placeholder="Enter value"
            value={newFilter.value}
            onChange={e => setNewFilter(prev => ({ ...prev, value: e.target.value }))}
          />
          {inputError && <p className="text-red-500 text-xs mt-1">{inputError}</p>}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full md:w-auto px-6 py-3 bg-lime-600 hover:bg-lime-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          onClick={handleAddFilter}
          disabled={!newFilter.category || !newFilter.condition || !newFilter.value}
        >
          <FaPlus className="text-sm transform transition-transform hover:rotate-90" />
          Add Filter
        </motion.button>
      </div>
    </div>
  );
};

export default Filters;
