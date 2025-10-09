import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Introduction from '../components/Introduction';
import DesignPrinciples from '../components/DesignPrinciples';
import UsageDirection from '../components/UsageDirection';
import FutureEnhancements from '../components/FutureEnhancements';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import sidebarData from '../data/sidebarSections.json';

// Extract data from JSON
const { sidebarSections, tableOfContents } = sidebarData;

export default function ComponentsPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const mainContentRef = useRef<HTMLElement>(null);
  const location = useLocation();

  // Handle URL hash changes
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && ['introduction', 'design-principles', 'usage-direction', 'future-enhancements'].includes(hash)) {
      setActiveSection(hash);
    }
  }, [location.hash]);

  // Create modified sidebar sections for the components page
  // Remove href from Getting Started items to enable state-based navigation within this page
  const modifiedSidebarSections = sidebarSections.map(section => {
    if (section.title === 'Getting Started') {
      return {
        ...section,
        items: section.items.map((item: any) => ({
          ...item,
          href: undefined // Remove href to enable state-based navigation
        }))
      };
    }
    return section;
  });

  return (
    <div className="bg-black text-white w-full flex">
      {/* Left Sidebar */}
      <SidebarLeft 
        sidebarSections={modifiedSidebarSections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <main ref={mainContentRef} className="flex-1 h-[calc(100vh-4rem)] overflow-y-scroll">
        <div className="p-8 pb-16">
          {activeSection === 'introduction' && (
            <Introduction />
          )}

          {activeSection === 'design-principles' && (
            <DesignPrinciples />
          )}

          {activeSection === 'usage-direction' && (
            <UsageDirection />
          )}

          {activeSection === 'future-enhancements' && (
            <FutureEnhancements />
          )}
        </div>
      </main>

      {/* Right Sidebar - Table of Contents */}
      <SidebarRight 
        tableOfContents={tableOfContents}
        activeSection={activeSection}
        mainContentRef={mainContentRef}
      />
    </div>
  );
}


