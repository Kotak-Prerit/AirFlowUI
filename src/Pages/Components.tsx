import { useState, useRef } from 'react';
import { SiHtml5, SiVuedotjs, SiSvelte, SiNextdotjs, SiAstro } from 'react-icons/si';
import Introduction from '../components/Introduction';
import DesignPrinciples from '../components/DesignPrinciples';
import UsageDirection from '../components/UsageDirection';
import FutureEnhancements from '../components/FutureEnhancements';
import AccordionPage from '../components/AccordionPage';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';

// Component examples for different frameworks
const buttonExamples = {
  html: `<button class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
  Button
</button>`,
  react: `'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button 
      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

// Usage
<Button onClick={() => console.log('Clicked!')}>
  Click me
</Button>`,
  vue: `<template>
  <button 
    class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button'
}
</script>

<!-- Usage -->
<Button @click="handleClick">Click me</Button>`,
  svelte: `<script>
  export let type = 'button';
</script>

<button 
  {type}
  class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
  on:click
>
  <slot />
</button>

<!-- Usage -->
<Button on:click={handleClick}>Click me</Button>`,
  astro: `---
// Button.astro
export interface Props {
  type?: 'button' | 'submit' | 'reset';
  class?: string;
}

const { type = 'button', class: className = '', ...rest } = Astro.props;
const buttonClass = \`px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors \${className}\`;
---

<button type={type} class={buttonClass} {...rest}>
  <slot />
</button>

<!-- Usage -->
<Button>Click me</Button>`
};

// Sidebar navigation structure
const sidebarSections = [
  {
    title: 'Getting Started',
    isAccordion: true,
    items: [
      { id: 'introduction', title: 'Introduction', active: true },
      { id: 'design-principles', title: 'Design Principles' },
      { id: 'usage-direction', title: 'Usage Direction' },
      { id: 'future-enhancements', title: 'Future Enhancements' }
    ]
  },
  {
    title: 'Components',
    count: 100,
    isAccordion: true,
    items: [
      { id: 'accordion', title: 'Accordion' },
      { id: 'alert', title: 'Alert' },
      { id: 'alert-dialog', title: 'Alert Dialog' },
      { id: 'app-shell', title: 'App Shell' },
      { id: 'aspect-ratio', title: 'Aspect Ratio' },
      { id: 'avatar', title: 'Avatar' },
      { id: 'backdrop', title: 'Backdrop' },
      { id: 'badge', title: 'Badge' },
      { id: 'banner', title: 'Banner' },
      { id: 'breadcrumb', title: 'Breadcrumb' },
      { id: 'button', title: 'Button' },
      { id: 'button-group', title: 'Button Group' },
      { id: 'calendar', title: 'Calendar' },
      { id: 'callout', title: 'Callout' },
      { id: 'card', title: 'Card' },
      { id: 'carousel', title: 'Carousel' },
      { id: 'chart', title: 'Chart' },
      { id: 'chat-bubble', title: 'Chat Bubble' },
      { id: 'checkbox', title: 'Checkbox' },
      { id: 'chip', title: 'Chip' },
      { id: 'code-block', title: 'Code Block' },
      { id: 'collapsible', title: 'Collapsible' },
      { id: 'color-picker', title: 'Color Picker' },
      { id: 'combobox', title: 'Combobox' },
      { id: 'command', title: 'Command' },
      { id: 'command-palette', title: 'Command Palette' },
      { id: 'confirmation-dialog', title: 'Confirmation Dialog' },
      { id: 'context-menu', title: 'Context Menu' },
      { id: 'countdown-timer', title: 'Countdown Timer' },
      { id: 'data-grid', title: 'Data Grid' },
      { id: 'data-table', title: 'Data Table' },
      { id: 'date-picker', title: 'Date Picker' },
      { id: 'date-range-picker', title: 'Date Range Picker' },
      { id: 'dialog', title: 'Dialog' },
      { id: 'divider', title: 'Divider' },
      { id: 'drawer', title: 'Drawer' },
      { id: 'dropdown-menu', title: 'Dropdown Menu' },
      { id: 'empty-state', title: 'Empty State' },
      { id: 'error-boundary', title: 'Error Boundary' },
      { id: 'expandable-panel', title: 'Expandable Panel' },
      { id: 'feature-tile', title: 'Feature Tile' },
      { id: 'file-dropzone', title: 'File Dropzone' },
      { id: 'file-input', title: 'File Input' },
      { id: 'filter-panel', title: 'Filter Panel' },
      { id: 'floating-button', title: 'Floating Button' },
      { id: 'form-stepper', title: 'Form Stepper' },
      { id: 'grid-list-toggle', title: 'Grid/List Toggle' },
      { id: 'heading', title: 'Heading' },
      { id: 'hover-card', title: 'Hover Card' },
      { id: 'icon-button', title: 'Icon Button' },
      { id: 'image-cropper', title: 'Image Cropper' },
      { id: 'image-gallery', title: 'Image Gallery' },
      { id: 'infinite-scroll', title: 'Infinite Scroll' },
      { id: 'info-box', title: 'Info Box' },
      { id: 'input', title: 'Input' },
      { id: 'input-mask', title: 'Input Mask' },
      { id: 'input-otp', title: 'Input OTP' },
      { id: 'json-viewer', title: 'JSON Viewer' },
      { id: 'keybind-indicator', title: 'Keybind Indicator' },
      { id: 'label', title: 'Label' },
      { id: 'lightbox', title: 'Lightbox' },
      { id: 'link-preview', title: 'Link Preview' },
      { id: 'loading-spinner', title: 'Loading Spinner' },
      { id: 'log-console', title: 'Log Console' },
      { id: 'masonry-layout', title: 'Masonry Layout' },
      { id: 'media-player', title: 'Media Player' },
      { id: 'mega-menu', title: 'Mega Menu' },
      { id: 'menubar', title: 'Menubar' },
      { id: 'modal', title: 'Modal' },
      { id: 'multi-select', title: 'Multi-select' },
      { id: 'navigation-drawer', title: 'Navigation Drawer' },
      { id: 'navigation-menu', title: 'Navigation Menu' },
      { id: 'notification', title: 'Notification' },
      { id: 'number-input', title: 'Number Input' },
      { id: 'pagination', title: 'Pagination' },
      { id: 'parallax-section', title: 'Parallax Section' },
      { id: 'password-strength-meter', title: 'Password Strength Meter' },
      { id: 'pin-input', title: 'Pin Input' },
      { id: 'placeholder-loader', title: 'Placeholder Loader' },
      { id: 'popover', title: 'Popover' },
      { id: 'pricing-card', title: 'Pricing Card' },
      { id: 'process-timeline', title: 'Process Timeline' },
      { id: 'progress', title: 'Progress' },
      { id: 'qr-code-generator', title: 'QR Code Generator' },
      { id: 'radio-group', title: 'Radio Group' },
      { id: 'rating-stars', title: 'Rating Stars' },
      { id: 'reaction-bar', title: 'Reaction Bar' },
      { id: 'resizable', title: 'Resizable' },
      { id: 'scroll-area', title: 'Scroll Area' },
      { id: 'scroll-spy', title: 'Scroll Spy' },
      { id: 'search-input', title: 'Search Input' },
      { id: 'select', title: 'Select' },
      { id: 'separator', title: 'Separator' },
      { id: 'sheet', title: 'Sheet' },
      { id: 'sidebar', title: 'Sidebar' },
      { id: 'skeleton', title: 'Skeleton' },
      { id: 'slider', title: 'Slider' },
      { id: 'snackbar', title: 'Snackbar' },
      { id: 'stepper', title: 'Stepper' },
      { id: 'switch', title: 'Switch' }
    ]
  }
];

// Table of contents for different pages
const tableOfContents = {
  introduction: [
    { id: 'overview', title: 'Overview' },
    { id: 'what-is-airflowui', title: 'What is AirflowUI?' },
    { id: 'key-features', title: 'Key Features' },
    { id: 'framework-support', title: 'Framework Support' },
    { id: 'design-inspiration', title: 'Design Inspiration' }
  ],
  'design-principles': [
    { id: 'overview', title: 'Overview' },
    { id: 'simplicity-first', title: 'Simplicity First' },
    { id: 'copy-paste-ready', title: 'Copy-Paste Ready' },
    { id: 'modern-aesthetic', title: 'Modern & Aesthetic' },
    { id: 'modular-lightweight', title: 'Modular & Lightweight' },
    { id: 'customization-flexibility', title: 'Customization & Flexibility' },
    { id: 'cross-framework', title: 'Cross-Framework Consistency' },
    { id: 'accessibility-first', title: 'Accessibility First' },
    { id: 'smart-extensibility', title: 'Smart Extensibility' }
  ],
  'usage-direction': [
    { id: 'overview', title: 'Overview' },
    { id: 'how-to-use', title: 'How to Use' },
    { id: 'customization-tips', title: 'Customization Tips' },
    { id: 'example-workflow', title: 'Example Workflow' }
  ],
  'future-enhancements': [
    { id: 'overview', title: 'Overview' },
    { id: 'cli-integration', title: 'CLI Integration' },
    { id: 'smart-search', title: 'Smart Search' },
    { id: 'user-dashboard', title: 'User Dashboard' },
    { id: 'full-templates', title: 'Full Templates' },
    { id: 'analytics', title: 'Analytics' }
  ],
  accordion: [
    { id: 'overview', title: 'Overview' },
    { id: 'installation', title: 'Installation' },
    { id: 'usage', title: 'Usage' },
    { id: 'customization', title: 'Customization' },
    { id: 'accessibility', title: 'Accessibility' },
    { id: 'api-reference', title: 'API Reference' }
  ]
};

export default function ComponentsPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [activeFramework, setActiveFramework] = useState('html');
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({ 
    'Getting Started': true,
    'Components': false 
  });
  const [copied, setCopied] = useState(false);
  const mainContentRef = useRef<HTMLElement>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const frameworks = [
    { id: 'html', name: 'HTML', icon: <SiHtml5 className="text-orange-500" /> },
    { id: 'react', name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
    { id: 'vue', name: 'Vue.js', icon: <SiVuedotjs className="text-green-500" /> },
    { id: 'svelte', name: 'Svelte', icon: <SiSvelte className="text-orange-400" /> },
    { id: 'astro', name: 'Astro', icon: <SiAstro className="text-purple-500" /> }
  ];

  return (
    <div className="bg-black text-white w-full flex">
      {/* Left Sidebar */}
      <SidebarLeft 
        sidebarSections={sidebarSections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        openAccordions={openAccordions}
        toggleAccordion={toggleAccordion}
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

          {activeSection === 'accordion' && (
            <AccordionPage />
          )}

          {/* Components Section */}
          {activeSection === 'buttons' && (
            <div className="space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-4xl font-semibold mb-4">Button Components</h1>
                <p className="text-xl text-zinc-400">
                  Beautiful, accessible button components ready to copy and paste.
                </p>
              </div>

              {/* Framework Support Section */}
              <section id="frameworks">
                <h2 className="text-2xl font-semibold mb-4">Framework Support</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
                  {frameworks.map((framework) => (
                    <div key={framework.id} className="bg-card p-6 rounded-xl text-center border border-zinc-800">
                      <div className="text-3xl mb-3 flex justify-center">{framework.icon}</div>
                      <div className="font-medium text-white">{framework.name}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Example Component Section */}
              <section id="example">
                <h2 className="text-2xl font-semibold mb-4">Example Component</h2>
                <p className="text-zinc-300 mb-6">
                  Here's a simple Button component example. Switch between different frameworks 
                  to see how it's implemented in each one.
                </p>

                {/* Framework Tabs */}
                <div className="bg-card rounded-2xl overflow-hidden">
                  <div className="border-b border-zinc-800">
                    <div className="flex">
                      {frameworks.map((framework) => (
                        <button
                          key={framework.id}
                          onClick={() => setActiveFramework(framework.id)}
                          className={`px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                            activeFramework === framework.id
                              ? 'bg-blue-600 text-white'
                              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                          }`}
                        >
                          <span className="text-base">{framework.icon}</span>
                          <span>{framework.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  </div>

                  {/* Code Display */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Button Component</h3>
                      <button
                        onClick={() => copyToClipboard(buttonExamples[activeFramework as keyof typeof buttonExamples])}
                        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-colors"
                      >
                        {copied ? (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    
                    <pre className="bg-zinc-900 p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm text-zinc-300">
                        {buttonExamples[activeFramework as keyof typeof buttonExamples]}
                      </code>
                    </pre>

                    {/* Preview */}
                    <div className="mt-6 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                      <div className="text-sm text-zinc-400 mb-3">Preview:</div>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
                        Button
                      </button>
                    </div>
                  </div>
                </section>
              </div>
          )}

          {/* Placeholder for other components */}
          {!['introduction', 'design-principles', 'usage-direction', 'future-enhancements', 'accordion', 'buttons'].includes(activeSection) && (
            <div className="text-center py-16">
              <h1 className="text-3xl font-semibold mb-4 capitalize">{activeSection}</h1>
              <p className="text-zinc-400">Component documentation coming soon...</p>
            </div>
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


