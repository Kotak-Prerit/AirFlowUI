import React from 'react';

const DesignPrinciples: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-semibold mb-4">Design Principles</h1>
        <p className="text-xl text-zinc-400">
          The core principles that guide our component design and development.
        </p>
      </div>

      {/* Design Principles Content */}
      <section>
        <div className="prose prose-invert max-w-none space-y-8">
          <p className="text-zinc-300 text-lg">
            Our design principles ensure consistency, usability, and beautiful aesthetics across all components. 
            These guidelines help maintain a cohesive design system that scales with your projects.
          </p>

          {/* Principle 1 */}
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/50">
            <h3 className="text-xl font-semibold mb-3 text-white">1. Simplicity First</h3>
            <p className="text-zinc-300">
              Every component is designed with simplicity in mind. We remove unnecessary complexity 
              and focus on clean, intuitive interfaces that users can understand immediately.
            </p>
          </div>

          {/* Principle 2 */}
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/50">
            <h3 className="text-xl font-semibold mb-3 text-white">2. Copy-Paste Ready</h3>
            <p className="text-zinc-300">
              Components should work out of the box with minimal setup. Copy the code, 
              paste it into your project, and it just works. No complex configuration required.
            </p>
          </div>

          {/* Principle 3 */}
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/50">
            <h3 className="text-xl font-semibold mb-3 text-white">3. Modern Aesthetic</h3>
            <p className="text-zinc-300">
              Contemporary design patterns with clean lines, appropriate spacing, and thoughtful 
              use of color. Our components feel fresh and current without being trendy.
            </p>
          </div>

          {/* Principle 4 */}
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/50">
            <h3 className="text-xl font-semibold mb-3 text-white">4. Accessibility by Default</h3>
            <p className="text-zinc-300">
              Every component is built with accessibility in mind. Proper ARIA labels, 
              keyboard navigation, and screen reader support are built-in, not afterthoughts.
            </p>
          </div>

          {/* Principle 5 */}
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/50">
            <h3 className="text-xl font-semibold mb-3 text-white">5. Performance Optimized</h3>
            <p className="text-zinc-300">
              Lightweight, fast-loading components that don't bloat your bundle size. 
              Optimized animations and efficient rendering keep your apps responsive.
            </p>
          </div>

          {/* Principle 6 */}
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/50">
            <h3 className="text-xl font-semibold mb-3 text-white">6. Consistent Design Language</h3>
            <p className="text-zinc-300">
              A unified design system ensures all components work harmoniously together. 
              Consistent spacing, typography, and color usage across the entire library.
            </p>
          </div>

          {/* Principle 7 */}
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/50">
            <h3 className="text-xl font-semibold mb-3 text-white">7. Mobile-First Responsive</h3>
            <p className="text-zinc-300">
              Designed for mobile devices first, then enhanced for larger screens. 
              Every component looks and works beautifully across all device sizes.
            </p>
          </div>

          {/* Principle 8 */}
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/50">
            <h3 className="text-xl font-semibold mb-3 text-white">8. Developer Experience</h3>
            <p className="text-zinc-300">
              Clear documentation, intuitive props, and helpful TypeScript definitions. 
              Components should be a joy to work with, not a source of frustration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignPrinciples;
