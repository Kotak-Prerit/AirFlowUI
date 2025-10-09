import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface SidebarLeftProps {
  sidebarSections: any[];
  activeSection?: string;
  openAccordions?: { [key: string]: boolean };
  toggleAccordion?: (section: string) => void;
  setActiveSection?: (id: string) => void;
}

const SidebarLeft: React.FC<SidebarLeftProps> = ({ 
  sidebarSections, 
  activeSection,
  openAccordions: propOpenAccordions, 
  toggleAccordion: propToggleAccordion, 
  setActiveSection 
}) => {
  const location = useLocation();
  
  // Local accordion state if not provided via props (for router-based navigation)
  const [localOpenAccordions, setLocalOpenAccordions] = useState<{ [key: string]: boolean }>({ 
    'Getting Started': true,
    'Components': true 
  });
  
  const openAccordions = propOpenAccordions || localOpenAccordions;
  const toggleAccordion = propToggleAccordion || ((section: string) => {
    setLocalOpenAccordions(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  });

  const handleItemClick = (item: any) => {
    if (item.href) {
      // Router-based navigation - no need to call setActiveSection
      return;
    } else if (setActiveSection) {
      // Internal state navigation (for original Components page)
      setActiveSection(item.id);
    }
  };

  const isItemActive = (item: any) => {
    if (item.href) {
      return location.pathname === item.href;
    } else if (activeSection) {
      return activeSection === item.id;
    }
    return false;
  };

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 h-[calc(100vh-4rem)] flex-shrink-0 z-40 relative">
      {/* Top vignette - fixed */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-zinc-950 to-transparent pointer-events-none z-10"></div>
      
      {/* Bottom vignette - fixed */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-10"></div>
      
      {/* Scrollable content container */}
      <div className="h-full overflow-y-scroll">
        <div className="p-6">
          <nav className="space-y-2 pb-8">
        {sidebarSections.map((section) => (
          <div key={section.title}>
            <div
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-zinc-800 cursor-pointer"
              onClick={() => section.isAccordion && toggleAccordion(section.title)}
            >
              <span className="text-sm font-medium text-zinc-300">{section.title}</span>
              <div className="flex items-center gap-2">
                {section.count && (
                  <span className="text-xs bg-zinc-700 px-2 py-0.5 rounded">{section.count}</span>
                )}
                {section.isAccordion && (
                  <svg
                    className={`w-4 h-4 transition-transform ${openAccordions[section.title] ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            </div>
            {(!section.isAccordion || openAccordions[section.title]) && (
              <div className="pl-2">
                {section.items.map((item: any) => {
                  const isActive = isItemActive(item);
                  
                  if (item.href) {
                    // Router-based navigation
                    return (
                      <NavLink
                        key={item.id}
                        to={item.href}
                        className={`block py-1 rounded-sm text-sm cursor-pointer transition-colors ${
                          isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {item.title}
                      </NavLink>
                    );
                  } else {
                    // Internal state navigation (for original Components page)
                    return (
                      <div
                        key={item.id}
                        className={`py-1 rounded-sm text-sm cursor-pointer transition-colors ${
                          isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                        }`}
                        onClick={() => handleItemClick(item)}
                      >
                        {item.title}
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
          ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default SidebarLeft;
