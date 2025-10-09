import { useState, useRef } from 'react';
import Introduction from '../components/Introduction';
import DesignPrinciples from '../components/DesignPrinciples';
import UsageDirection from '../components/UsageDirection';
import FutureEnhancements from '../components/FutureEnhancements';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import sidebarData from '../data/sidebarSections.json';

// Extract data from JSON
const { sidebarSections, tableOfContents } = sidebarData;

// Update the sidebar sections to use href for routing
const updatedSidebarSections = sidebarSections.map(section => {
  if (section.title === 'Getting Started') {
    return {
      ...section,
      items: section.items.map((item: any) => ({
        ...item,
        // Getting started items stay in the components page with anchors
        href: `/components#${item.id}`
      }))
    };
  } else if (section.title === 'Components') {
    return {
      ...section,
      items: section.items.map((item: any) => ({
        ...item,
        // Component items get their own routes
        href: `/components/${item.id}`
      }))
    };
  }
  return section;
});

export default function ComponentsPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const mainContentRef = useRef<HTMLElement>(null);

  return (
    <div className="bg-black text-white w-full flex">
      {/* Left Sidebar */}
      <SidebarLeft 
        sidebarSections={updatedSidebarSections}
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


