import React from 'react';

interface SidebarLeftProps {
  sidebarSections: any[];
  openAccordions: { [key: string]: boolean };
  toggleAccordion: (section: string) => void;
  activeSection: string;
  setActiveSection: (id: string) => void;
}

const SidebarLeft: React.FC<SidebarLeftProps> = ({ sidebarSections, openAccordions, toggleAccordion, activeSection, setActiveSection }) => (
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
                {section.items.map((item: any) => (
                  <div
                    key={item.id}
                    className={`py-1 px-3 rounded-lg text-sm cursor-pointer ${activeSection === item.id ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
    </div>
  </aside>
);

export default SidebarLeft;
