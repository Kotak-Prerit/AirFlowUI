import React, { type RefObject } from 'react';

interface SidebarRightProps {
  tableOfContents: { [key: string]: { id: string; title: string }[] };
  activeSection: string;
  mainContentRef?: RefObject<HTMLElement | null>;
}

const SidebarRight: React.FC<SidebarRightProps> = ({ tableOfContents, activeSection, mainContentRef }) => {
  const handleScrollTo = (elementId: string) => {
    // Find the target element first
    const targetElement = document.getElementById(elementId);
    
    if (!targetElement) {
      console.warn(`Element with id "${elementId}" not found`);
      return;
    }

    // Use the ref if provided, otherwise fall back to querySelector
    const mainContainer = mainContentRef?.current || document.querySelector('main');
    
    if (!mainContainer) {
      console.warn('Main container not found');
      return;
    }

    // Calculate the position of the target element relative to the main container
    const mainRect = mainContainer.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    
    // Calculate relative position
    const relativeTop = targetRect.top - mainRect.top + mainContainer.scrollTop;
    
    // Smooth scroll to the target position
    mainContainer.scrollTo({
      top: relativeTop - 32, // 32px offset for better visual spacing
      behavior: 'smooth'
    });
  };

  return (
    <aside className="w-64 bg-zinc-950 border-l border-zinc-800 h-[calc(100vh-4rem)] overflow-y-scroll flex-shrink-0 z-40">
      <div className="p-6">
        <h3 className="text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wide">On this page</h3>
        <nav className="space-y-1 pb-8">
          {(tableOfContents[activeSection as keyof typeof tableOfContents] || []).map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className="block w-full text-left text-sm text-zinc-400 hover:text-white transition-colors py-0.5 cursor-pointer"
            >
              {item.title}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default SidebarRight;
