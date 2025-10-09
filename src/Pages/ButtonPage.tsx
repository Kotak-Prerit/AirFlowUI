import { useRef, useState } from 'react';
import SidebarLeft from '../components/SidebarLeft';
import sidebarData from '../data/sidebarSections.json';
import buttonsData from '../data/components/buttons.json';

// Extract data from JSON
const { sidebarSections } = sidebarData;
// Button cards component - renders buttons from JSON data with pagination
const ButtonCards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const buttonsPerPage = 8;
  
  // Calculate pagination
  const totalButtons = buttonsData.buttons.length;
  const totalPages = Math.ceil(totalButtons / buttonsPerPage);
  const startIndex = (currentPage - 1) * buttonsPerPage;
  const endIndex = startIndex + buttonsPerPage;
  const currentButtons = buttonsData.buttons.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold mb-4">Buttons</h1>
        <p className="text-xl text-zinc-400">
          AirflowUI buttons uses tailwind classes under the hood for easy customization. Please make sure tailwind is integrated with your project.
        </p>
      </div>

      <div className="flex flex-wrap gap-6">
        {currentButtons.map((button) => (
          <div key={button.id} className={`${button.background} border border-zinc-800 rounded-xl p-6 min-w-[300px] min-h-[250px] flex-1`}>
            
            {/* Button preview area */}
            <div className="h-full rounded-lg p-8">
              <div className="flex items-center justify-center h-full">
                <div dangerouslySetInnerHTML={{ __html: button.component }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-900 disabled:text-zinc-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Previous
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-900 disabled:text-zinc-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Page Info */}
      <div className="text-center text-zinc-400 text-sm">
        Showing {startIndex + 1}-{Math.min(endIndex, totalButtons)} of {totalButtons} buttons
      </div>
    </div>
  );
};

export default function ButtonPage() {
  const mainContentRef = useRef<HTMLElement>(null);

  return (
    <div className="bg-black text-white w-full flex">
      {/* Left Sidebar */}
      <SidebarLeft 
        sidebarSections={sidebarSections}
        activeSection="button"
      />

      {/* Main Content */}
      <main ref={mainContentRef} className="flex-1 h-[calc(100vh-4rem)] overflow-y-scroll">
        <div className="p-8 pb-16">
          <ButtonCards />
        </div>
      </main>
    </div>
  );
}