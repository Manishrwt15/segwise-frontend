import { useState } from "react";
import { mockData } from "../data/mockData";
import { useFilterStore } from "../store/filterStore";
import PreviewBox from "./PreviewBox";
import FullModal from "./Modal"; 
import { ChevronUp, ChevronDown, ChevronsUpDown, SearchIcon, ExternalLink } from "lucide-react";

const columnDisplayNames: { [key: string]: string } = {
  creative_id: "Creative ID",
  creative_name: "Creative Name",
  country: "Country",
  os: "OS",
  ad_network: "Ad Network",
  campaign: "Campaign",
  ad_group: "Ad Group",
  ipm: "IPM",
  ctr: "CTR",
  spend: "Spend",
  impressions: "Impressions",
  clicks: "Clicks",
  cpm: "CPM",
  cost_per_click: "Cost Per Click",
  cost_per_install: "Cost Per Install",
  installs: "Installs",
};

const Table = () => {
  const { filters } = useFilterStore();
  const [sortColumn, setSortColumn] = useState<keyof typeof mockData[0] | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewData, setPreviewData] = useState<any | null>(null);
  const [modalData, setModalData] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleSort = (column: keyof typeof mockData[0]) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const filteredData = mockData
    .filter((item) => {
      return filters.every(({ category, condition, value }) => {
        if (!category || !condition || value === "") return true;
        
        const key = category as keyof typeof item;
        
        if (
          ["ipm", "ctr", "spend", "impressions", "clicks", "cpm", "cost_per_click", "cost_per_install", "installs"].includes(category)
        ) {
          const numValue = parseFloat(value);
          if (isNaN(numValue)) return false;
        
          const numericItemValue = Number(item[key]); // ✅ Convert item[key] to number
        
          switch (condition) {
            case "greater_than":
              return numericItemValue > numValue;
            case "less_than":
              return numericItemValue < numValue;
            case "equals":
              return numericItemValue === numValue;
            default:
              return true;
          }
        }

        if (["country", "os", "ad_network", "campaign", "ad_group"].includes(category)) {
          const itemValue = String(item[key]).toLowerCase();
          const filterValue = value.toLowerCase();

          switch (condition) {
            case "is": return itemValue === filterValue;
            case "is_not": return itemValue !== filterValue;
            case "contains": return itemValue.includes(filterValue);
            case "does_not_contain": return !itemValue.includes(filterValue);
            default: return true;
          }
        }
        return true;
      });
    })
    .filter((item) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return Object.values(item).some((val) =>
        String(val).toLowerCase().includes(query)
      );
    });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);


  const tableColumns = [
    "creative_id",
    "creative_name",
    "country",
    "os", 
    "ad_network",
    "campaign",
    "ad_group",
    "ipm",
    "ctr",
    "spend",
    "impressions",
    "clicks",
    "cpm",
    "cost_per_click",
    "cost_per_install",
    "installs",
  ];

  
  return (
    <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-200/50 h-screen overflow-y-auto">
  
    <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
      <h2 className="text-2xl font-semibold text-lime-400 text-center lg:text-left">Data Table</h2>
      <div className="relative w-full lg:w-72">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search records..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border-0 bg-gray-50 py-2 pl-10 pr-4 text-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-lime-200"
        />
      </div>
    </div>

    
    <div className="overflow-x-auto px-4">
        <table className="w-full min-w-[1200px] lg:min-w-0 border-collapse">
          <thead className="border-b border-gray-300 text-sm font-semibold text-gray-900">
            <tr>
              <th className="sticky left-0 z-10 bg-white px-4 py-3"></th>
              {tableColumns.map((col) => (
                <th
                  key={col}
                  onClick={() => handleSort(col as keyof typeof mockData[0])}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    {columnDisplayNames[col]}
                    {sortColumn === col ? (
                      sortOrder === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : (
                      <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        <tbody className="divide-y divide-gray-200 text-sm">
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr
                key={`${item.creative_id}-${index}`}
                className={`hover:bg-gray-100 transition-colors ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className=" px-4 py-3">
                  <button
                    onClick={() => setPreviewData(item)}
                    className="text-lime-600 hover:text-lime-800 flex items-center gap-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Preview</span>
                  </button>
                </td>
                <td className="px-4 py-3 font-medium">{item.creative_id}</td>
                <td className="px-4 py-3 whitespace-normal break-words">
                  {item.creative_name}
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs">
                    {item.country}
                  </span>
                </td>
                <td className="px-4 py-3">{item.os}</td>
                <td className="px-4 py-3">{item.ad_network}</td>
                <td className="px-4 py-3 whitespace-normal break-words">
                  {item.campaign}
                </td>
                <td className="px-4 py-3 whitespace-normal break-words">
                  {item.ad_group}
                </td>
                <td className="px-4 py-3 text-right">{item.ipm.toFixed(2)}</td>
                <td className="px-4 py-3 text-right">{item.ctr}%</td>
                <td className="px-4 py-3 text-right font-medium">
                  ${item.spend.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right">
                  {item.impressions.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right">
                  {item.clicks.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right">${item.cpm.toFixed(2)}</td>
                <td className="px-4 py-3 text-right">
                  ${item.cost_per_click.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-right">
                  ${item.cost_per_install.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-right">
                  {item.installs.toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={17} className="py-6 text-center text-gray-500">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {totalPages > 1 && (
      <div className="flex flex-col items-center gap-4 border-t border-gray-200 px-4 py-3 sm:flex-row sm:justify-between">
        <div className="text-sm text-gray-500">
          Showing {paginatedData.length} of {sortedData.length} results
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="flex items-center rounded-lg border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="flex items-center rounded-lg border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    )}

    {previewData && (
      <PreviewBox
        data={previewData}
        onClose={() => setPreviewData(null)}
        onExpand={() => setModalData(previewData)}
      />
    )}
    {modalData && <FullModal data={modalData} onClose={() => setModalData(null)} />}
  </div>
  );  
};

export default Table;

