import React from 'react';
import principlesData from '../data/designPrinciples.json';

const DesignPrinciples: React.FC = () => {
  const { principles } = principlesData;

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
