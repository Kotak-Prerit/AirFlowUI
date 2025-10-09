import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import sidebarData from '../data/sidebarSections.json';

export default function GenericComponentPage() {
  const { componentId } = useParams();
  const mainContentRef = useRef<HTMLElement>(null);

  // Find the current component info from JSON data
  const componentSection = sidebarData.sidebarSections.find(section => section.title === 'Components');
  const currentComponent = componentSection?.items.find(item => item.id === componentId);
  const componentTitle = currentComponent ? currentComponent.title : 'Component';

  // Generate sidebar sections with current component as active
  const sidebarSections = sidebarData.sidebarSections.map(section => {
    if (section.title === 'Components') {
      return {
        ...section,
        items: section.items.map(item => ({
          ...item,
          active: item.id === componentId,
          href: `/components/${item.id}`
        }))
      };
    }
    return section;
  });

  // Use tableOfContents from JSON data
  const tableOfContents = sidebarData.tableOfContents;

  // Placeholder Component Content
  const ComponentContent = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold mb-4">{componentTitle}</h1>
        <p className="text-xl text-zinc-400">
          A beautiful, accessible {componentTitle.toLowerCase()} component ready to copy and paste.
        </p>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-sm text-zinc-400 ml-2">Preview</span>
          </div>
        </div>
        
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-zinc-800 rounded-lg mb-4">
            <svg className="w-10 h-10 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-zinc-300 mb-2">{componentTitle} Preview</h3>
          <p className="text-sm text-zinc-500">Component preview will be available soon</p>
        </div>
      </div>

      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4">Component documentation coming soon...</h2>
        <p className="text-zinc-400">Complete {componentTitle} component implementation with code examples will be available soon.</p>
        <div className="mt-6">
          <a 
            href="/components" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
          >
            ← Back to Components
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black text-white w-full flex">
      {/* Left Sidebar */}
      <SidebarLeft 
        sidebarSections={sidebarSections}
        activeSection={componentId || ''}
      />

      {/* Main Content */}
      <main ref={mainContentRef} className="flex-1 h-[calc(100vh-4rem)] overflow-y-scroll">
        <div className="p-8 pb-16">
          <ComponentContent />
        </div>
      </main>

      {/* Right Sidebar - Table of Contents */}
      <SidebarRight 
        tableOfContents={tableOfContents}
        activeSection={componentId || ''}
        mainContentRef={mainContentRef}
      />
    </div>
  );
}