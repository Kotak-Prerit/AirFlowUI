import { useRef, useState } from 'react';
import { useComponents } from '../hooks/useComponents';
import SidebarLeft from '../components/SidebarLeft';
import BookmarkIcon from '../components/BookmarkIcon';
import ComponentModal from '../components/ComponentModal';
import sidebarData from '../data/sidebarSections.json';
import type { Component } from '../services/componentService';
import { MdOutlineFullscreen } from 'react-icons/md';

// Extract data from JSON
const { sidebarSections } = sidebarData;

const ButtonCards = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('html');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const buttonsPerPage = 8;
  
  const { 
    components, 
    loading, 
    error, 
    pagination,
    fetchComponents,
    refetch,
    clearError
  } = useComponents({
    category: 'button',
    language: selectedLanguage,
    page: currentPage,
    limit: buttonsPerPage,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    await fetchComponents({ page });
  };

  const handleLanguageChange = async (language: string) => {
    setSelectedLanguage(language);
    setCurrentPage(1);
    await fetchComponents({ language, page: 1 });
  };

  const openModal = (component: Component) => {
    setSelectedComponent(component);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComponent(null);
  };

  // Loading state
  if (loading && !components.length) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium text-red-400 mb-2">Error Loading Components</h3>
        <p className="text-zinc-400 mb-4">{error}</p>
        <div className="space-x-3">
          <button 
            onClick={refetch}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <button 
            onClick={clearError}
            className="px-4 py-2 bg-zinc-600 text-white rounded hover:bg-zinc-500 transition-colors"
          >
            Clear Error
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-semibold mb-4">Buttons</h1>
        <p className="text-xl text-zinc-400">
          AirflowUI buttons use Tailwind classes for easy customization. <br />
          Please make sure Tailwind is integrated with your project.
        </p>
      </div>

      {/* Language Filter */}
      <div className="flex gap-2 flex-wrap">
        {['html', 'nextjs', 'vue', 'svelte', 'astro'].map(lang => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            disabled={loading}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors disabled:opacity-50 ${
              selectedLanguage === lang
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </button>
        ))}
      </div>

      {/* Loading indicator for pagination */}
      {loading && components.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Components Grid */}
      <div className="flex flex-wrap gap-6">
        {components.map((component) => (
          <div 
            key={component.componentId} 
            className={`${component.preview?.background || 'bg-zinc-900'} border border-zinc-800 rounded-xl p-6 min-w-[250px] min-h-[250px] flex-1 relative group hover:border-zinc-600 transition-colors`}
          >
            {/* Action Icons */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              {/* Fullscreen Icon */}
              <button
                onClick={() => openModal(component)}
                className="p-2 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 rounded-lg hover:bg-zinc-700/80 transition-colors text-zinc-300 hover:text-white"
                title="View code"
              >
                <MdOutlineFullscreen />
              </button>
              
              {/* Bookmark Icon */}
              <BookmarkIcon 
                componentId={component.componentId}
                componentName={component.name}
                className="bg-zinc-800/80 backdrop-blur-sm border border-zinc-700"
              />
            </div>
            
            {/* Component preview area */}
            <div className="h-full rounded-lg p-8">
              <div className={component.preview?.containerClass || 'flex items-center justify-center h-full'}>
                {component.frameworks[0] && (
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: component.frameworks[0].code 
                    }} 
                  />
                )}
              </div>
            </div>

            {/* Component Info */}
            <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-zinc-700">
                <h3 className="text-white text-sm font-medium">{component.name}</h3>
                {component.description && (
                  <p className="text-zinc-400 text-xs mt-1 max-w-[200px] truncate">
                    {component.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {!loading && components.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium text-zinc-400 mb-2">No components found</h3>
          <p className="text-zinc-500">
            No button components available for {selectedLanguage}. Try selecting a different language.
          </p>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => handlePageChange(pagination.current - 1)}
            disabled={!pagination.hasPrev || loading}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-900 disabled:text-zinc-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Previous
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
              const page = i + Math.max(1, pagination.current - 2);
              if (page > pagination.pages) return null;
              
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  disabled={loading}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                    pagination.current === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => handlePageChange(pagination.current + 1)}
            disabled={!pagination.hasNext || loading}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-900 disabled:text-zinc-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Page Info */}
      {pagination && (
        <div className="text-center text-zinc-400 text-sm">
          Showing {(pagination.current - 1) * pagination.limit + 1}-{Math.min(pagination.current * pagination.limit, pagination.total)} of {pagination.total} components
          {selectedLanguage && ` • Language: ${selectedLanguage}`}
        </div>
      )}

      {/* Component Modal */}
      <ComponentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        component={selectedComponent}
      />
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