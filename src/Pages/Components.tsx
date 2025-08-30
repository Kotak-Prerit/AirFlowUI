import { useState } from 'react';
import DesignPrinciples from '../components/DesignPrinciples';

// Component examples for different frameworks
const buttonExamples = {
  html: `<button class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
  Button
</button>`,
  react: `function Button({ children, ...props }) {
  return (
    <button 
      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}

// Usage
<Button>Click me</Button>`,
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
<Button>Click me</Button>`,
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
<Button on:click={handleClick}>Click me</Button>`
};

// Sidebar navigation structure
const sidebarSections = [
  {
    title: 'Getting Started',
    isAccordion: true,
    items: [
      { id: 'introduction', title: 'Introduction', active: true },
      { id: 'design-principles', title: 'Design Principles' }
    ]
  },
  {
    title: 'General',
    count: 4,
    items: [
      { id: 'button', title: 'Button' },
      { id: 'input', title: 'Input' },
      { id: 'select', title: 'Select' },
      { id: 'textarea', title: 'Textarea' }
    ]
  },
  {
    title: 'Layout',
    count: 6,
    items: [
      { id: 'container', title: 'Container' },
      { id: 'grid', title: 'Grid' },
      { id: 'flex', title: 'Flex' },
      { id: 'divider', title: 'Divider' },
      { id: 'space', title: 'Space' },
      { id: 'center', title: 'Center' }
    ]
  }
];

// Table of contents for different pages
const tableOfContents = {
  introduction: [
    { id: 'introduction', title: 'Introduction' },
    { id: 'installation', title: 'Installation' },
    { id: 'usage', title: 'Usage' },
    { id: 'frameworks', title: 'Framework Support' },
    { id: 'example', title: 'Example Component' }
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
  ]
};

export default function ComponentsPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [activeFramework, setActiveFramework] = useState('html');
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({ 'Getting Started': true });
  const [copied, setCopied] = useState(false);

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
    { id: 'html', name: 'HTML', icon: '🌐' },
    { id: 'react', name: 'React', icon: '⚛️' },
    { id: 'vue', name: 'Vue', icon: '💚' },
    { id: 'svelte', name: 'Svelte', icon: '🧡' }
  ];

  return (
    <div className="min-h-screen bg-black text-white w-full">
      {/* Left Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 h-screen fixed left-0 top-16 overflow-y-auto flex-shrink-0 z-40">
        <div className="p-6">
          
          <nav className="space-y-2">
              {sidebarSections.map((section) => (
                <div key={section.title}>
                  <div 
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-zinc-800 cursor-pointer"
                    onClick={() => section.isAccordion && toggleAccordion(section.title)}
                  >
                    <span className="text-sm font-medium text-zinc-300">
                      {section.title}
                    </span>
                    <div className="flex items-center gap-2">
                      {section.count && (
                        <span className="text-xs bg-zinc-700 px-2 py-0.5 rounded">
                          {section.count}
                        </span>
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
                    <div className="ml-4 space-y-1">
                      {section.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveSection(item.id)}
                          className={`block w-full text-left py-2 px-3 text-sm rounded-lg transition-colors ${
                            activeSection === item.id 
                              ? 'bg-blue-600 text-white' 
                              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                          }`}
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 mr-64 min-h-screen">
          <div className="p-8 pb-16">
            {activeSection === 'introduction' && (
              <div className="space-y-8">
                {/* Header */}
                <div>
                  <h1 className="text-4xl font-semibold mb-4">Introduction</h1>
                  <p className="text-xl text-zinc-400">
                    Start building beautiful interfaces in minutes with AirflowUI components.
                  </p>
                </div>

                {/* Introduction Section */}
                <section id="introduction">
                  <h2 className="text-2xl font-semibold mb-4">What is AirflowUI?</h2>
                  <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-zinc-300">
                      AirflowUI is a modern component library that helps you build beautiful user interfaces quickly. 
                      Our components are designed with simplicity and performance in mind, allowing you to 
                      <strong className="text-white"> copy, paste, and ship</strong> without any complex setup.
                    </p>
                    <p className="text-zinc-300">
                      Why AirflowUI exists:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-zinc-300">
                      <li>⚡ <strong>Time-saving:</strong> Pre-built components ready to use</li>
                      <li>🎨 <strong>Beautiful designs:</strong> Modern, clean, and accessible</li>
                      <li>🔧 <strong>Framework agnostic:</strong> Works with any framework</li>
                      <li>📱 <strong>Responsive:</strong> Mobile-first approach</li>
                    </ul>
                  </div>
                </section>
              </div>
            )}

            {activeSection === 'design-principles' && (
              <DesignPrinciples />
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {frameworks.map((framework) => (
                      <div key={framework.id} className="bg-card p-4 rounded-xl text-center">
                        <div className="text-2xl mb-2">{framework.icon}</div>
                        <div className="font-medium">{framework.name}</div>
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
                            className={`px-4 py-3 text-sm font-medium transition-colors ${
                              activeFramework === framework.id
                                ? 'bg-blue-600 text-white'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                            }`}
                          >
                            {framework.icon} {framework.name}
                          </button>
                        ))}
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
                  </div>
                </section>
              </div>
            )}

            {/* Placeholder for other components */}
            {activeSection !== 'getting-started' && (
              <div className="text-center py-16">
                <h1 className="text-3xl font-semibold mb-4 capitalize">{activeSection}</h1>
                <p className="text-zinc-400">Component documentation coming soon...</p>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar - Table of Contents */}
        <aside className="w-64 bg-zinc-950 border-l border-zinc-800 h-screen fixed right-0 top-16 overflow-y-auto flex-shrink-0 z-40">
          <div className="p-6">
            <h3 className="text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wide">
              On this page
            </h3>
            <nav className="space-y-2">
              {(tableOfContents[activeSection as keyof typeof tableOfContents] || []).map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-sm text-zinc-400 hover:text-white transition-colors py-1"
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
  );
}


