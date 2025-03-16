import { useState } from "react";
import { mockData } from "../data/mockData";
import Table from "./Table";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(mockData.length / rowsPerPage);
  const currentData = mockData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="p-6">
      <Table data={currentData} />
    </div>
  );
};

export default Dashboard;
