import React from 'react';

const DesignPrinciples: React.FC = () => {
  const principles = [
    {
      id: 'simplicity-first',
      title: 'Simplicity First',
      description: 'Every component is designed with simplicity in mind. We remove unnecessary complexity and focus on clean, intuitive interfaces that users can understand immediately.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'copy-paste-ready',
      title: 'Copy-Paste Ready',
      description: 'Components should work out of the box with minimal setup. Copy the code, paste it into your project, and it just works. No complex configuration required.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'modern-aesthetic',
      title: 'Modern Aesthetic',
      description: 'Contemporary design patterns with clean lines, appropriate spacing, and thoughtful use of color. Our components feel fresh and current without being trendy.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'accessibility-first',
      title: 'Accessibility by Default',
      description: 'Every component is built with accessibility in mind. Proper ARIA labels, keyboard navigation, and screen reader support are built-in, not afterthoughts.',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'performance-optimized',
      title: 'Performance Optimized',
      description: 'Lightweight, fast-loading components that don\'t bloat your bundle size. Optimized animations and efficient rendering keep your apps responsive.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'consistent-design',
      title: 'Consistent Design Language',
      description: 'A unified design system ensures all components work harmoniously together. Consistent spacing, typography, and color usage across the entire library.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'mobile-first',
      title: 'Mobile-First Responsive',
      description: 'Designed for mobile devices first, then enhanced for larger screens. Every component looks and works beautifully across all device sizes.',
      color: 'from-teal-500 to-green-500'
    },
    {
      id: 'developer-experience',
      title: 'Developer Experience',
      description: 'Clear documentation, intuitive props, and helpful TypeScript definitions. Components should be a joy to work with, not a source of frustration.',
      color: 'from-rose-500 to-pink-500'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div id="overview" className="text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          Design Principles
        </h1>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          The core principles that guide our component design and development, ensuring consistency, 
          usability, and beautiful aesthetics across all components.
        </p>
      </div>

      {/* Principles Grid */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((principle, index) => (
            <div
              key={principle.id}
              className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-all duration-300 hover:transform hover:scale-[1.02] hover:cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Gradient background effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${principle.color} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-white transition-colors">
                  {principle.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {principle.description}
                </p>
              </div>

              {/* Subtle border glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${principle.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />
            </div>
          ))}
        </div>
      </section>

      {/* Bottom section with additional info */}
      <section className="relative">
        <div className="rounded-2xl p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Built for Modern Development
            </h2>
            <p className="text-zinc-300 mx-auto leading-relaxed max-w-[70%]">
              These principles aren't just guidelines—they're promises. Every component in AirFlowUI is crafted with these values at its core, ensuring you get tools that are both powerful and delightful to use.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignPrinciples;
