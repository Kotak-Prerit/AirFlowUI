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
  // Multi-expand accordion state
  const [multiActiveFramework, setMultiActiveFramework] = useState<FrameworkType>('html');
  const [multiActiveTab, setMultiActiveTab] = useState('preview');
  const [multiCopied, setMultiCopied] = useState(false);
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  
  // Single-expand accordion state
  const [singleActiveFramework, setSingleActiveFramework] = useState<FrameworkType>('html');
  const [singleActiveTab, setSingleActiveTab] = useState('preview');
  const [singleCopied, setSingleCopied] = useState(false);
  const [singleOpenItem, setSingleOpenItem] = useState<string>('company'); // Default open item

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

  // Multi-expand accordion toggle
  const toggleAccordion = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Single-expand accordion toggle
  const toggleSingleAccordion = (id: string) => {
    setSingleOpenItem(prev => prev === id ? '' : id);
  };

  // Multi-expand copy function
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setMultiCopied(true);
      setTimeout(() => setMultiCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Single-expand copy function
  const copySingleToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setSingleCopied(true);
      setTimeout(() => setSingleCopied(false), 2000);
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

  // Code examples for Multi-expand accordion
  const multiCodeExamples: Record<FrameworkType, string> = {
    html: `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Accordion Component</title>\n  <script src=\"https://cdn.tailwindcss.com\"></script>\n  <script>\n    tailwind.config = {\n      theme: {\n        extend: {\n          fontFamily: {\n            'inter': ['Inter', 'sans-serif'],\n          }\n        }\n      }\n    }\n  </script>\n  <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap\" rel=\"stylesheet\">\n</head>\n<body class=\"bg-black text-white font-inter p-8\">\n  <div class=\"max-w-2xl mx-auto rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800\">\n    <div class=\"accordion-item border-b border-zinc-800\" data-open=\"false\">\n      <button class=\"accordion-header w-full p-6 bg-transparent border-none text-white text-lg font-semibold text-left cursor-pointer transition-all duration-200 flex justify-between items-center hover:bg-zinc-800 focus:outline-none\" aria-expanded=\"false\" aria-controls=\"company-content\">\n        <span>Company Information</span>\n        <span class=\"accordion-icon transition-transform duration-200 text-zinc-400 text-xl\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"20\" height=\"20\" viewBox=\"0 0 256 256\" xml:space=\"preserve\"> \n            <g style=\"stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;\" transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\">\n            <path d=\"M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z\" style=\"stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;\" transform=\" matrix(1 0 0 1 0 0) \" stroke-linecap=\"round\"/>\n            </g>\n          </svg>\n        </span>\n      </button>\n      <div class=\"accordion-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out\" id=\"company-content\">\n        <div class=\"accordion-body px-6 pb-4 text-zinc-400 leading-relaxed\">\n          Learn about our mission, vision, and company history. We are dedicated to providing exceptional services and building lasting relationships with our clients worldwide.\n        </div>\n      </div>\n    </div>\n\n    <div class=\"accordion-item border-b border-zinc-800\" data-open=\"false\">\n      <button class=\"accordion-header w-full p-6 bg-transparent border-none text-white text-lg font-semibold text-left cursor-pointer transition-all duration-200 flex justify-between items-center hover:bg-zinc-800 focus:outline-none\" aria-expanded=\"false\" aria-controls=\"services-content\">\n        <span>Our Services</span>\n        <span class=\"accordion-icon transition-transform duration-200 text-zinc-400 text-xl\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"20\" height=\"20\" viewBox=\"0 0 256 256\" xml:space=\"preserve\">\n            <g style=\"stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;\" transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\">\n            <path d=\"M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z\" style=\"stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;\" transform=\" matrix(1 0 0 1 0 0) \" stroke-linecap=\"round\"/>\n            </g>\n          </svg>\n        </span>\n      </button>\n      <div class=\"accordion-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out\" id=\"services-content\">\n        <div class=\"accordion-body px-6 pb-4 text-zinc-400 leading-relaxed\">\n          We offer a comprehensive range of services including web development, mobile applications, cloud solutions, and digital transformation consulting to help your business grow.\n        </div>\n      </div>\n    </div>\n\n    <div class=\"accordion-item\" data-open=\"false\">\n      <button class=\"accordion-header w-full p-6 bg-transparent border-none text-white text-lg font-semibold text-left cursor-pointer transition-all duration-200 flex justify-between items-center hover:bg-zinc-800 focus:outline-none\" aria-expanded=\"false\" aria-controls=\"support-content\">\n        <span>Customer Support</span>\n        <span class=\"accordion-icon transition-transform duration-200 text-zinc-400 text-xl\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"20\" height=\"20\" viewBox=\"0 0 256 256\" xml:space=\"preserve\">\n            <g style=\"stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;\" transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\">\n\t          <path d=\"M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z\" style=\"stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;\" transform=\" matrix(1 0 0 1 0 0) \" stroke-linecap=\"round\"/>\n            </g>\n          </svg>\n        </span>\n      </button>\n      <div class=\"accordion-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out\" id=\"support-content\">\n        <div class=\"accordion-body px-6 pb-4 text-zinc-400 leading-relaxed\">\n          Our dedicated support team is available 24/7 to assist you with any questions or technical issues. Contact us via email, phone, or live chat for immediate assistance.\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <script>\n    document.addEventListener('DOMContentLoaded', function() {\n      const accordionHeaders = document.querySelectorAll('.accordion-header');\n      \n      accordionHeaders.forEach(header => {\n        header.addEventListener('click', function() {\n          const item = this.parentElement;\n          const content = item.querySelector('.accordion-content');\n          const icon = this.querySelector('.accordion-icon');\n          const isOpen = item.dataset.open === 'true';\n          \n          // Close all other items\n          accordionHeaders.forEach(otherHeader => {\n            const otherItem = otherHeader.parentElement;\n            const otherContent = otherItem.querySelector('.accordion-content');\n            const otherIcon = otherHeader.querySelector('.accordion-icon');\n            \n            if (otherItem !== item) {\n              otherItem.dataset.open = 'false';\n              otherHeader.setAttribute('aria-expanded', 'false');\n              otherContent.style.maxHeight = '0';\n              otherIcon.style.transform = 'rotate(0deg)';\n            }\n          });\n          \n          // Toggle current item\n          if (!isOpen) {\n            item.dataset.open = 'true';\n            this.setAttribute('aria-expanded', 'true');\n            content.style.maxHeight = content.scrollHeight + 'px';\n            icon.style.transform = 'rotate(180deg)';\n          } else {\n            item.dataset.open = 'false';\n            this.setAttribute('aria-expanded', 'false');\n            content.style.maxHeight = '0';\n            icon.style.transform = 'rotate(0deg)';\n          }\n        });\n      });\n    });\n  </script>\n</body>\n</html>`,

    nextjs: "import React, { useState } from 'react';\nimport { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';\n\nconst AccordionComponent = () => {\n  const [openItems, setOpenItems] = useState({});\n\n  const accordionData = [\n    {\n      id: 'company',\n      title: 'Company Information',\n      content: 'Learn about our mission, vision, and company history. We are dedicated to providing exceptional services and building lasting relationships with our clients worldwide.'\n    },\n    {\n      id: 'services',\n      title: 'Our Services',\n      content: 'We offer a comprehensive range of services including web development, mobile applications, cloud solutions, and digital transformation consulting to help your business grow.'\n    },\n    {\n      id: 'support',\n      title: 'Customer Support',\n      content: 'Our dedicated support team is available 24/7 to assist you with any questions or technical issues. Contact us via email, phone, or live chat for immediate assistance.'\n    }\n  ];\n\n  const toggleAccordion = (id) => {\n    setOpenItems(prev => ({\n      ...prev,\n      [id]: !prev[id]\n    }));\n  };\n\n  return (\n    <div className=\"max-w-2xl mx-auto px-4 py-16 min-h-screen flex items-center\">\n      <div className=\"rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 w-full\">\n        {accordionData.map((item, index) => (\n          <div \n            key={item.id} \n            className={`${index !== accordionData.length - 1 ? 'border-b border-zinc-800' : ''}`}\n          >\n            <button\n              className=\"w-full px-6 py-4 text-left flex justify-between items-center hover:bg-zinc-800 transition-colors focus:outline-none\"\n              onClick={() => toggleAccordion(item.id)}\n              aria-expanded={openItems[item.id] || false}\n            >\n              <span className=\"text-lg font-semibold text-white\">\n                {item.title}\n              </span>\n              <span className=\"text-zinc-400 transition-transform duration-200\">\n                {openItems[item.id] ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}\n              </span>\n            </button>\n            <div \n              className={`overflow-hidden transition-all duration-300 ease-in-out ${\n                openItems[item.id] ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'\n              }`}\n            >\n              <div className=\"px-6 pb-4 text-zinc-400 leading-relaxed\">\n                {item.content}\n              </div>\n            </div>\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n};\n\nexport default AccordionComponent;",

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

    vue: `<script setup>
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

<template>
  <div class="accordion-container">
    <div class="accordion">
      <div 
        v-for="(item, index) in accordionData" 
        :key="item.id"
        :class="['accordion-item', { 'accordion-border': index !== accordionData.length - 1 }]"
      >
        <button
          class="accordion-button"
          @click="toggleAccordion(item.id)"
          :aria-expanded="openItems[item.id] || false"
        >
          <span>{{ item.title }}</span>
        </button>
        <Transition name="accordion">
          <div v-if="openItems[item.id]" class="accordion-content">
            <div class="accordion-text">
              {{ item.content }}
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.accordion-container {
  max-width: 650px;
  margin: 0 auto;
}

.accordion {
  background-color: #18181b;
  border: 1px solid #27272a;
  border-radius: 12px;
  overflow: hidden;
}

.accordion-item.accordion-border {
  border-bottom: 1px solid #27272a;
}

.accordion-button {
  width: 100%;
  padding: 16px 24px;
  background: none;
  border: none;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.accordion-button:hover {
  background-color: #27272a;
}

.accordion-icon {
  color: #a1a1aa;
  font-size: 22px;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.accordion-content {
  overflow: hidden;
}

.accordion-text {
  padding: 0 24px 16px;
  color: #a1a1aa;
  line-height: 1.6;
}

/* Transition */
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
</style>
`,

    svelte: `<script>\n  import { slide } from 'svelte/transition';\n  let openItems = {};\n\n  const accordionData = [\n    {\n      id: 'company',\n      title: 'Company Information',\n      content: 'Learn about our mission, vision, and company history. We are dedicated to providing exceptional services and building lasting relationships with our clients worldwide.'\n    },\n    {\n      id: 'services',\n      title: 'Our Services',\n      content: 'We offer a comprehensive range of services including web development, mobile applications, cloud solutions, and digital transformation consulting to help your business grow.'\n    },\n    {\n      id: 'support',\n      title: 'Customer Support',\n      content: 'Our dedicated support team is available 24/7 to assist you with any questions or technical issues. Contact us via email, phone, or live chat for immediate assistance.'\n    }\n  ];\n\n  const toggleAccordion = (id) => {\n    openItems = { ...openItems, [id]: !openItems[id] };\n  };\n</script>\n\n<div class=\"accordion-container\">\n  <div class=\"accordion\">\n    {#each accordionData as item, index}\n      <div class=\"accordion-item {index !== accordionData.length - 1 ? 'accordion-border' : ''}\">\n        <button\n          class=\"accordion-button\"\n          on:click={() => toggleAccordion(item.id)}\n          aria-expanded={openItems[item.id] || false}\n        >\n          <span>{item.title}</span>\n        </button>\n        {#if openItems[item.id]}\n          <div class=\"accordion-content\" transition:slide>\n            <div class=\"accordion-text\">\n              {item.content}\n            </div>\n          </div>\n        {/if}\n      </div>\n    {/each}\n  </div>\n</div>\n\n<style>\n  .accordion-container {\n    max-width: 650px;\n    margin: 0 auto;\n  }\n\n  .accordion {\n    background-color: #18181b;\n    border: 1px solid #27272a;\n    border-radius: 12px;\n    overflow: hidden;\n  }\n\n  .accordion-item.accordion-border {\n    border-bottom: 1px solid #27272a;\n  }\n\n  .accordion-button {\n    width: 100%;\n    padding: 16px 24px;\n    background: none;\n    border: none;\n    text-align: left;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    font-size: 18px;\n    font-weight: 600;\n    color: white;\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n  }\n\n  .accordion-button:hover {\n    background-color: #27272a;\n  }\n\n  .accordion-content {\n    overflow: hidden;\n  }\n\n  .accordion-text {\n    padding: 0 24px 16px;\n    color: #a1a1aa;\n    line-height: 1.6;\n  }\n</style>`
  };

  // Code examples for Single-expand accordion
  const singleCodeExamples: Record<FrameworkType, string> = {
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
        <span class="accordion-icon transition-transform duration-200 text-zinc-400 text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
	<path d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
</g>
</svg>

</span>
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
        <span class="accordion-icon transition-transform duration-200 text-zinc-400 text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
	<path d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
</g>
</svg>

            </span>
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
        <span class="accordion-icon transition-transform duration-200 text-zinc-400 text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
	<path d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
</g>
</svg>
        </span>
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
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';

const SingleExpandAccordion = () => {
  const [openItem, setOpenItem] = useState('company'); // Default open item

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
    setOpenItem(prev => prev === id ? '' : id);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 min-h-screen flex items-center">
      <div className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 w-full">
        {accordionData.map((item, index) => (
          <div 
            key={item.id} 
            className={\`\${index !== accordionData.length - 1 ? 'border-b border-zinc-800' : ''}\`}
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-zinc-800 transition-colors focus:outline-none"
              onClick={() => toggleAccordion(item.id)}
              aria-expanded={openItem === item.id}
            >
              <span className="text-lg font-semibold text-white">
                {item.title}
              </span>
              <span className="text-zinc-400 transition-transform duration-200">
                {openItem === item.id ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
              </span>
            </button>
            <div 
              className={\`overflow-hidden transition-all duration-300 ease-in-out \${
                openItem === item.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
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

export default SingleExpandAccordion;`,

    astro: `<div class="accordion-container">
  <div class="accordion" data-single-expand="true">
    <div class="accordion-item" data-default-open="true">
      <button class="accordion-header" data-accordion="company">
        <span>Company Information</span>
        <span class="accordion-icon">⮝</span>
      </button>
      <div class="accordion-content open" data-content="company">
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
    let currentOpen = 'company'; // Default open item
    
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const target = header.dataset.accordion;
        const content = document.querySelector(\`[data-content="\${target}"]\`);
        const icon = header.querySelector('.accordion-icon');
        const isOpen = content.classList.contains('open');
        
        // Close currently open accordion if different
        if (currentOpen && currentOpen !== target) {
          const currentContent = document.querySelector(\`[data-content="\${currentOpen}"]\`);
          const currentIcon = document.querySelector(\`[data-accordion="\${currentOpen}"] .accordion-icon\`);
          if (currentContent && currentIcon) {
            currentContent.classList.remove('open');
            currentIcon.textContent = '⮟';
          }
        }
        
        // Toggle current accordion
        if (!isOpen) {
          content.classList.add('open');
          icon.textContent = '⮝';
          currentOpen = target;
        } else {
          content.classList.remove('open');
          icon.textContent = '⮟';
          currentOpen = null;
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
          :aria-expanded="openItem === item.id"
        >
          <span>{{ item.title }}</span>
          <span class="text-zinc-400 transition-transform duration-200">
            {{ openItem === item.id ? '⮝' : '⮟' }}
          </span>
        </button>
        <Transition name="accordion">
          <div 
            v-if="openItem === item.id"
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

const openItem = ref('company') // Default open item

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
  openItem.value = openItem.value === id ? '' : id
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
  
  let openItem = 'company'; // Default open item

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
    openItem = openItem === id ? '' : id;
  }
</script>

<div class="max-w-2xl mx-auto">
  <div class="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
    {#each accordionData as item, index}
      <div class="{index !== accordionData.length - 1 ? 'border-b border-zinc-800' : ''}">
        <button
          class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-zinc-800 transition-colors focus:outline-none"
          on:click={() => toggleAccordion(item.id)}
          aria-expanded={openItem === item.id}
        >
          <span class="text-lg font-semibold text-white">
            {item.title}
          </span>
          <span class="text-zinc-400 transition-transform duration-200">
            {openItem === item.id ? '⮝' : '⮟'}
          </span>
        </button>
        {#if openItem === item.id}
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
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-semibold mb-4">Accordion</h1>
        <p className="text-xl text-zinc-400">
          A vertically stacked set of interactive headings that each reveal a section of content.
        </p>
      </div>

      {/* Multi-Expand Accordion Section */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Multi-Expand Accordion</h2>
          <p className="text-lg text-zinc-400">
            Allows multiple accordion items to be open simultaneously.
          </p>
        </div>

        {/* Multi-Expand Preview/Code Tabs */}
        <div className="border-b border-zinc-800">
          <div className="flex gap-8">
            <button
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                multiActiveTab === 'preview'
                  ? 'border-white text-white'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
              onClick={() => setMultiActiveTab('preview')}
            >
              Preview
            </button>
            <button
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                multiActiveTab === 'code'
                  ? 'border-white text-white'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
              onClick={() => setMultiActiveTab('code')}
            >
              Code
            </button>
          </div>
        </div>

        {/* Multi-Expand Content */}
        {multiActiveTab === 'preview' && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
            {/* Preview Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-zinc-400 ml-2">Multi-Expand Preview</span>
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

        {multiActiveTab === 'code' && (
          <div className="space-y-4">
            {/* Framework Selection */}
            <div className="flex gap-1 p-1 bg-zinc-900 rounded-lg w-fit border border-zinc-800">
              {frameworks.map((framework) => (
                <button
                  key={framework.id}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    multiActiveFramework === framework.id
                      ? 'bg-zinc-700 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                  onClick={() => setMultiActiveFramework(framework.id)}
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
                      {multiActiveFramework === 'html' ? 'multi-accordion.html' : 
                       multiActiveFramework === 'nextjs' ? 'MultiAccordion.tsx' :
                       multiActiveFramework === 'astro' ? 'MultiAccordion.astro' :
                       multiActiveFramework === 'vue' ? 'MultiAccordion.vue' :
                       'MultiAccordion.svelte'}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(multiCodeExamples[multiActiveFramework])}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-md transition-colors border border-zinc-700 flex items-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    {multiCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                
                {/* Code Content */}
                <SyntaxHighlighter
                  language={getLanguageForFramework(multiActiveFramework)}
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
                  {multiCodeExamples[multiActiveFramework]}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Single-Expand Accordion Section */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Single-Expand Accordion</h2>
          <p className="text-lg text-zinc-400">
            Only allows one accordion item to be open at a time.
          </p>
        </div>

        {/* Single-Expand Preview/Code Tabs */}
        <div className="border-b border-zinc-800">
          <div className="flex gap-8">
            <button
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                singleActiveTab === 'preview'
                  ? 'border-white text-white'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
              onClick={() => setSingleActiveTab('preview')}
            >
              Preview
            </button>
            <button
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                singleActiveTab === 'code'
                  ? 'border-white text-white'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
              onClick={() => setSingleActiveTab('code')}
            >
              Code
            </button>
          </div>
        </div>

        {/* Single-Expand Content */}
        {singleActiveTab === 'preview' && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
            {/* Preview Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-zinc-400 ml-2">Single-Expand Preview</span>
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
                        onClick={() => toggleSingleAccordion(item.id)}
                        aria-expanded={singleOpenItem === item.id}
                      >
                        <span className="text-lg font-semibold text-white">
                          {item.title}
                        </span>
                        <span className="text-zinc-400 transition-transform duration-200">
                          {singleOpenItem === item.id ? (
                            <MdOutlineKeyboardArrowUp size={24} />
                          ) : (
                            <MdOutlineKeyboardArrowDown size={24} />
                          )}
                        </span>
                      </button>
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          singleOpenItem === item.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
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

        {singleActiveTab === 'code' && (
          <div className="space-y-4">
            {/* Framework Selection */}
            <div className="flex gap-1 p-1 bg-zinc-900 rounded-lg w-fit border border-zinc-800">
              {frameworks.map((framework) => (
                <button
                  key={framework.id}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    singleActiveFramework === framework.id
                      ? 'bg-zinc-700 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                  onClick={() => setSingleActiveFramework(framework.id)}
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
                      {singleActiveFramework === 'html' ? 'single-accordion.html' : 
                       singleActiveFramework === 'nextjs' ? 'SingleAccordion.tsx' :
                       singleActiveFramework === 'astro' ? 'SingleAccordion.astro' :
                       singleActiveFramework === 'vue' ? 'SingleAccordion.vue' :
                       'SingleAccordion.svelte'}
                    </span>
                  </div>
                  <button
                    onClick={() => copySingleToClipboard(singleCodeExamples[singleActiveFramework])}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-md transition-colors border border-zinc-700 flex items-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    {singleCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                
                {/* Code Content */}
                <SyntaxHighlighter
                  language={getLanguageForFramework(singleActiveFramework)}
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
                  {singleCodeExamples[singleActiveFramework]}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccordionPage;
