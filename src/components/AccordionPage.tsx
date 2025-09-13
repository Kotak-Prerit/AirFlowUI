import React, { useState } from 'react';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { SiHtml5, SiNextdotjs, SiAstro, SiSvelte, SiVuedotjs } from 'react-icons/si';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type FrameworkType = 'html' | 'nextjs' | 'astro' | 'vue' | 'svelte';

// Function to get the appropriate language for syntax highlighting
const getLanguageForFramework = (framework: FrameworkType): string => {
  switch (framework) {
    case 'html':
      return 'html';
    case 'astro':
      // Use markup for Astro to highlight HTML/CSS/JS sections
      return 'markup';
    case 'vue':
      // Use markup for Vue to highlight the template syntax
      return 'markup';
    case 'svelte':
      // Use markup for Svelte to highlight the template syntax
      return 'markup';
    case 'nextjs':
      return 'tsx';
    default:
      return 'tsx';
  }
};

// Custom theme for better integration with our design
const customTheme = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: 'transparent',
    margin: 0,
    padding: 0,
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: 'transparent',
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
  },
};

const AccordionPage: React.FC = () => {
  const [activeFramework, setActiveFramework] = useState<FrameworkType>('html');
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  // Professional accordion data
  const accordionData = [
    {
      id: 'company',
      title: 'Company Information',
      content: 'Learn about our mission, vision, and company history. We are dedicated to providing exceptional services and building lasting relationships with our clients worldwide.'
    },
    {
      id: 'services',
      title: 'Our Services',
      content: 'We offer a comprehensive range of services including web development, mobile applications, cloud solutions, and digital transformation consulting to help your business grow.'
    },
    {
      id: 'support',
      title: 'Customer Support',
      content: 'Our dedicated support team is available 24/7 to assist you with any questions or technical issues. Contact us via email, phone, or live chat for immediate assistance.'
    }
  ];

  const toggleAccordion = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const frameworks: { id: FrameworkType; name: string; icon: React.ReactNode }[] = [
    { id: 'html', name: 'HTML', icon: <SiHtml5 className="w-4 h-4 text-orange-500" /> },
    { id: 'nextjs', name: 'Next.js', icon: <SiNextdotjs className="w-4 h-4 text-white" /> },
    { id: 'astro', name: 'Astro', icon: <SiAstro className="w-4 h-4 text-purple-500" /> },
    { id: 'vue', name: 'Vue.js', icon: <SiVuedotjs className="w-4 h-4 text-green-500" /> },
    { id: 'svelte', name: 'Svelte', icon: <SiSvelte className="w-4 h-4 text-orange-400" /> }
  ];

  // Code examples for different frameworks
  const codeExamples: Record<FrameworkType, string> = {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accordion Component</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            'inter': ['Inter', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-black text-white font-inter p-8">
  <div class="max-w-2xl mx-auto rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
    <div class="accordion-item border-b border-zinc-800" data-open="false">
      <button class="accordion-header w-full p-6 bg-transparent border-none text-white text-lg font-semibold text-left cursor-pointer transition-all duration-200 flex justify-between items-center hover:bg-zinc-800 focus:outline-none" aria-expanded="false" aria-controls="company-content">
        <span>Company Information</span>
        <span class="accordion-icon transition-transform duration-200 text-zinc-400 text-xl">⮟</span>
      </button>
      <div class="accordion-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out" id="company-content">
        <div class="accordion-body px-6 pb-4 text-zinc-400 leading-relaxed">
          Learn about our mission, vision, and company history. We are dedicated to providing exceptional services and building lasting relationships with our clients worldwide.
        </div>
      </div>
    </div>

    <div class="accordion-item border-b border-zinc-800" data-open="false">
      <button class="accordion-header w-full p-6 bg-transparent border-none text-white text-lg font-semibold text-left cursor-pointer transition-all duration-200 flex justify-between items-center hover:bg-zinc-800 focus:outline-none" aria-expanded="false" aria-controls="services-content">
        <span>Our Services</span>
        <span class="accordion-icon transition-transform duration-200 text-zinc-400 text-xl">⮟</span>
      </button>
      <div class="accordion-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out" id="services-content">
        <div class="accordion-body px-6 pb-4 text-zinc-400 leading-relaxed">
          We offer a comprehensive range of services including web development, mobile applications, cloud solutions, and digital transformation consulting to help your business grow.
        </div>
      </div>
    </div>

    <div class="accordion-item" data-open="false">
      <button class="accordion-header w-full p-6 bg-transparent border-none text-white text-lg font-semibold text-left cursor-pointer transition-all duration-200 flex justify-between items-center hover:bg-zinc-800 focus:outline-none" aria-expanded="false" aria-controls="support-content">
        <span>Customer Support</span>
        <span class="accordion-icon transition-transform duration-200 text-zinc-400 text-xl">⮟</span>
      </button>
      <div class="accordion-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out" id="support-content">
        <div class="accordion-body px-6 pb-4 text-zinc-400 leading-relaxed">
          Our dedicated support team is available 24/7 to assist you with any questions or technical issues. Contact us via email, phone, or live chat for immediate assistance.
        </div>
      </div>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const accordionHeaders = document.querySelectorAll('.accordion-header');
      
      accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
          const item = this.parentElement;
          const content = item.querySelector('.accordion-content');
          const icon = this.querySelector('.accordion-icon');
          const isOpen = item.dataset.open === 'true';
          
          // Close all other items
          accordionHeaders.forEach(otherHeader => {
            const otherItem = otherHeader.parentElement;
            const otherContent = otherItem.querySelector('.accordion-content');
            const otherIcon = otherHeader.querySelector('.accordion-icon');
            
            if (otherItem !== item) {
              otherItem.dataset.open = 'false';
              otherHeader.setAttribute('aria-expanded', 'false');
              otherContent.style.maxHeight = '0';
              otherIcon.style.transform = 'rotate(0deg)';
            }
          });
          
          // Toggle current item
          if (!isOpen) {
            item.dataset.open = 'true';
            this.setAttribute('aria-expanded', 'true');
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
          } else {
            item.dataset.open = 'false';
            this.setAttribute('aria-expanded', 'false');
            content.style.maxHeight = '0';
            icon.style.transform = 'rotate(0deg)';
          }
        });
      });
    });
  </script>
</body>
</html>`,

    nextjs: `import React, { useState } from 'react';

const Accordion = () => {
  const [openItems, setOpenItems] = useState({});

  const accordionData = [
    {
      id: 'company',
      title: 'Company Information',
      content: 'Learn about our mission, vision, and company history. We are dedicated to providing exceptional services and building lasting relationships with our clients worldwide.'
    },
    {
      id: 'services',
      title: 'Our Services',
      content: 'We offer a comprehensive range of services including web development, mobile applications, cloud solutions, and digital transformation consulting to help your business grow.'
    },
    {
      id: 'support',
      title: 'Customer Support',
      content: 'Our dedicated support team is available 24/7 to assist you with any questions or technical issues. Contact us via email, phone, or live chat for immediate assistance.'
    }
  ];

  const toggleAccordion = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
        {accordionData.map((item, index) => (
          <div 
            key={item.id} 
            className={\`\${index !== accordionData.length - 1 ? 'border-b border-zinc-800' : ''}\`}
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-zinc-800 transition-colors focus:outline-none"
              onClick={() => toggleAccordion(item.id)}
              aria-expanded={openItems[item.id] || false}
            >
              <span className="text-lg font-semibold text-white">
                {item.title}
              </span>
              <span className="text-zinc-400 transition-transform duration-200">
                {openItems[item.id] ? '⮝' : '⮟'}
              </span>
            </button>
            <div 
              className={\`overflow-hidden transition-all duration-300 ease-in-out \${
                openItems[item.id] ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }\`}
            >
              <div className="px-6 pb-4 text-zinc-400 leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;`,

    astro: `<div class="accordion-container">
  <div class="accordion">
    <div class="accordion-item">
      <button class="accordion-header" data-accordion="company">
        <span>Company Information</span>
        <span class="accordion-icon">⮟</span>
      </button>
      <div class="accordion-content" data-content="company">
        <div class="accordion-body">
          Learn about our mission, vision, and company history. We are dedicated to providing exceptional services and building lasting relationships with our clients worldwide.
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <button class="accordion-header" data-accordion="services">
        <span>Our Services</span>
        <span class="accordion-icon">⮟</span>
      </button>
      <div class="accordion-content" data-content="services">
        <div class="accordion-body">
          We offer a comprehensive range of services including web development, mobile applications, cloud solutions, and digital transformation consulting to help your business grow.
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <button class="accordion-header" data-accordion="support">
        <span>Customer Support</span>
        <span class="accordion-icon">⮟</span>
      </button>
      <div class="accordion-content" data-content="support">
        <div class="accordion-body">
          Our dedicated support team is available 24/7 to assist you with any questions or technical issues. Contact us via email, phone, or live chat for immediate assistance.
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .accordion-container {
    @apply max-w-2xl mx-auto;
  }

  .accordion {
    @apply rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800;
  }

  .accordion-item {
    @apply border-b border-zinc-800 last:border-b-0;
  }

  .accordion-header {
    @apply w-full px-6 py-4 text-left flex justify-between items-center hover:bg-zinc-800 transition-colors focus:outline-none text-lg font-semibold text-white;
  }

  .accordion-icon {
    @apply text-zinc-400 transition-transform duration-200;
  }

  .accordion-content {
    @apply overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0;
  }

  .accordion-content.open {
    @apply max-h-48 opacity-100;
  }

  .accordion-body {
    @apply px-6 pb-4 text-zinc-400 leading-relaxed;
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const target = header.dataset.accordion;
        const content = document.querySelector(\`[data-content="\${target}"]\`);
        const icon = header.querySelector('.accordion-icon');
        const isOpen = content.classList.contains('open');
        
        // Close all other accordions
        document.querySelectorAll('.accordion-content').forEach(otherContent => {
          if (otherContent !== content) {
            otherContent.classList.remove('open');
          }
        });
        
        document.querySelectorAll('.accordion-icon').forEach(otherIcon => {
          if (otherIcon !== icon) {
            otherIcon.classList.remove('rotated');
          }
        });
        
        // Toggle current accordion
        if (!isOpen) {
          content.classList.add('open');
          icon.textContent = '⮝';
        } else {
          content.classList.remove('open');
          icon.textContent = '⮟';
        }
      });
    });
  });
</script>`,

    vue: `<template>
  <div class="max-w-2xl mx-auto">
    <div class="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
      <div 
        v-for="(item, index) in accordionData" 
        :key="item.id"
        :class="index !== accordionData.length - 1 ? 'border-b border-zinc-800' : ''"
      >
        <button
          class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-zinc-800 transition-colors focus:outline-none text-lg font-semibold text-white"
          @click="toggleAccordion(item.id)"
          :aria-expanded="openItems[item.id] || false"
        >
          <span>{{ item.title }}</span>
          <span class="text-zinc-400 transition-transform duration-200">
            {{ openItems[item.id] ? '⮝' : '⮟' }}
          </span>
        </button>
        <Transition name="accordion">
          <div 
            v-if="openItems[item.id]"
            class="overflow-hidden"
          >
            <div class="px-6 pb-4 text-zinc-400 leading-relaxed">
              {{ item.content }}
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openItems = ref({})

const accordionData = [
  {
    id: 'company',
    title: 'Company Information',
    content: 'Learn about our mission, vision, and company history. We are dedicated to providing exceptional services and building lasting relationships with our clients worldwide.'
  },
  {
    id: 'services',
    title: 'Our Services',
    content: 'We offer a comprehensive range of services including web development, mobile applications, cloud solutions, and digital transformation consulting to help your business grow.'
  },
  {
    id: 'support',
    title: 'Customer Support',
    content: 'Our dedicated support team is available 24/7 to assist you with any questions or technical issues. Contact us via email, phone, or live chat for immediate assistance.'
  }
]

const toggleAccordion = (id) => {
  openItems.value = {
    ...openItems.value,
    [id]: !openItems.value[id]
  }
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease-in-out;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 200px;
  opacity: 1;
}
</style>`,

    svelte: `<script>
  import { slide } from 'svelte/transition';
  
  let openItems = {};

  const accordionData = [
    {
      id: 'company',
      title: 'Company Information',
      content: 'Learn about our mission, vision, and company history. We are dedicated to providing exceptional services and building lasting relationships with our clients worldwide.'
    },
    {
      id: 'services',
      title: 'Our Services',
      content: 'We offer a comprehensive range of services including web development, mobile applications, cloud solutions, and digital transformation consulting to help your business grow.'
    },
    {
      id: 'support',
      title: 'Customer Support',
      content: 'Our dedicated support team is available 24/7 to assist you with any questions or technical issues. Contact us via email, phone, or live chat for immediate assistance.'
    }
  ];

  function toggleAccordion(id) {
    openItems = {
      ...openItems,
      [id]: !openItems[id]
    };
  }
</script>

<div class="max-w-2xl mx-auto">
  <div class="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
    {#each accordionData as item, index}
      <div class="{index !== accordionData.length - 1 ? 'border-b border-zinc-800' : ''}">
        <button
          class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-zinc-800 transition-colors focus:outline-none"
          on:click={() => toggleAccordion(item.id)}
          aria-expanded={openItems[item.id] || false}
        >
          <span class="text-lg font-semibold text-white">
            {item.title}
          </span>
          <span class="text-zinc-400 transition-transform duration-200">
            {openItems[item.id] ? '⮝' : '⮟'}
          </span>
        </button>
        {#if openItems[item.id]}
          <div 
            class="overflow-hidden"
            transition:slide={{ duration: 300 }}
          >
            <div class="px-6 pb-4 text-zinc-400 leading-relaxed">
              {item.content}
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  :global(.rotate-180) {
    transform: rotate(180deg);
  }
</style>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-semibold mb-4">Accordion</h1>
        <p className="text-xl text-zinc-400">
          A vertically stacked set of interactive headings that each reveal a section of content.
        </p>
      </div>

      {/* Preview/Code Tabs */}
      <div className="border-b border-zinc-800">
        <div className="flex gap-8">
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'preview'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'code'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('code')}
          >
            Code
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'preview' && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
          {/* Preview Header */}
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
          
          {/* Preview Content */}
          <div className="p-8">
            <div className="max-w-2xl mx-auto">
              <div className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                {accordionData.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`${index !== accordionData.length - 1 ? 'border-b border-zinc-800' : ''}`}
                  >
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-zinc-800 transition-colors focus:outline-none"
                      onClick={() => toggleAccordion(item.id)}
                      aria-expanded={openItems[item.id] || false}
                    >
                      <span className="text-lg font-semibold text-white">
                        {item.title}
                      </span>
                      <span className="text-zinc-400 transition-transform duration-200">
                        {openItems[item.id] ? (
                          <MdOutlineKeyboardArrowUp size={24} />
                        ) : (
                          <MdOutlineKeyboardArrowDown size={24} />
                        )}
                      </span>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openItems[item.id] ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-4 text-zinc-400 leading-relaxed">
                        {item.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'code' && (
        <div className="space-y-4">
          {/* Framework Selection */}
          <div className="flex gap-1 p-1 bg-zinc-900 rounded-lg w-fit border border-zinc-800">
            {frameworks.map((framework) => (
              <button
                key={framework.id}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeFramework === framework.id
                    ? 'bg-zinc-700 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
                onClick={() => setActiveFramework(framework.id)}
              >
                {framework.icon}
                <span>{framework.name}</span>
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div className="relative">
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
              {/* Code Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm text-zinc-400 ml-2 font-mono">
                    {activeFramework === 'html' ? 'index.html' : 
                     activeFramework === 'nextjs' ? 'Accordion.tsx' :
                     activeFramework === 'astro' ? 'Accordion.astro' :
                     activeFramework === 'vue' ? 'Accordion.vue' :
                     'Accordion.svelte'}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(codeExamples[activeFramework])}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-md transition-colors border border-zinc-700 flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              {/* Code Content */}
              <SyntaxHighlighter
                language={getLanguageForFramework(activeFramework)}
                style={customTheme}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  background: 'transparent',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                }}
                showLineNumbers={false}
                wrapLines={true}
                wrapLongLines={true}
              >
                {codeExamples[activeFramework]}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionPage;
