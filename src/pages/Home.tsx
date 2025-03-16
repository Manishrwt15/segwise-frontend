import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import Filters from "../components/Filters";
import logo from "../assets/logo.jpeg";

const Home = ({ onStart }: { onStart: () => void }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterCount, setFilterCount] = useState(0);

  return (
    <div className='p-4'>
      {/* Header Section */}
      <header className='flex flex-wrap justify-start items-center space-x-4'>
        <div>
          <img src={logo} alt="Segwise Logo" className="h-16" />
        </div>
        <div>
          <h1 className='text-black text-3xl font-bold'>Segwise</h1>
          <p className='text-gray-500 text-xl'>Front End Test</p>
        </div>
      </header>

      {/* Main Section */}
      <main className="mt-20 md:mt-32 px-6 md:px-12">
        {/* Filter Section */}
        <div className='border-dashed border p-6 min-h-[8rem] md:h-60 flex justify-center items-center'>
          <div className='relative px-5 py-2 bg-gray-200 rounded-2xl flex flex-col items-start w-full md:w-3/4 mx-auto'>
            <button
              className='flex items-center bg-white rounded-md text-sm h-10 px-4 py-2 w-max relative'
              onClick={() => setShowFilters(!showFilters)}
            >
              <CiFilter className='mr-2' />
              Filter {filterCount > 0 && <span className='ml-2 bg-lime-500 text-white px-2 rounded-full text-xs'>{filterCount}</span>}
              <IoMdArrowDropdown className='ml-2' />
            </button>
            {showFilters && (
              <div className='mt-2 w-full bg-white shadow-lg rounded-md border border-gray-300 p-4'>
                <Filters setFilterCount={setFilterCount} />
              </div>
            )}
          </div>
        </div>

        {/* Instructions Section */}
        <div className="mt-8 md:m-16 text-left">
          <h2 className="text-lg font-medium">Instructions</h2>
          <ol className="list-decimal ml-5 text-gray-700 mt-4 text-sm">
            <li>Click on the "Filter" button to open the filter panel.</li>
            <li>The number of active filters is displayed on the button.</li>
            <li>Click "View Table" to see filtered results in a table format.</li>
            <li>UI elements have hover & focus effects for better user experience.</li>
          </ol>
          <button
            onClick={onStart}
            className="bg-lime-200 text-black px-6 py-3 rounded-lg shadow-md hover:bg-lime-300 transition-all mt-8"
          >
            View Table
          </button>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="mt-8">
        <p className='text-black text-end text-lg'>2025</p>
      </footer>
    </div>
  );
}

export default Home;
