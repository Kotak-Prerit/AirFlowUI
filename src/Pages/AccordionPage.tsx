import { useRef } from 'react';
import AccordionComponent from '../components/Accordion';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import sidebarData from '../data/sidebarSections.json';

// Extract data from JSON
const { sidebarSections, tableOfContents } = sidebarData;

export default function AccordionPage() {
  const mainContentRef = useRef<HTMLElement>(null);

  return (
    <div className="bg-black text-white w-full flex">
      {/* Left Sidebar */}
      <SidebarLeft 
        sidebarSections={sidebarSections}
        activeSection="accordion"
      />

      {/* Main Content */}
      <main ref={mainContentRef} className="flex-1 h-[calc(100vh-4rem)] overflow-y-scroll">
        <div className="p-8 pb-16">
          <AccordionComponent />
        </div>
      </main>

      {/* Right Sidebar - Table of Contents */}
      <SidebarRight 
        tableOfContents={tableOfContents}
        activeSection="accordion"
        mainContentRef={mainContentRef}
      />
    </div>
  );
}