import React from 'react';
import { SiHtml5, SiVuedotjs, SiSvelte, SiNextdotjs, SiAstro } from 'react-icons/si';

const Introduction: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div id="overview">
        <h1 className="text-4xl font-semibold mb-4">Introduction</h1>
        <p className="text-xl text-zinc-400">
          Welcome to AirflowUI — your fastest path from idea to interface.
        </p>
      </div>

      {/* What is AirflowUI */}
      <section id="what-is-airflowui" className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">What is AirflowUI?</h2>
        <div className="space-y-4">
          <p className="text-zinc-400">
            AirflowUI is a modern, free-to-use copy-paste component library built for developers who want to move fast without sacrificing design quality.
          </p>
          <p className="text-zinc-400">
            Instead of spending hours recreating the same buttons, cards, or navigation menus, you can simply browse through our library of 100+ components, copy the snippet, and paste it directly into your project.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section id="key-features" className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Key Features</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <p className="text-zinc-400">
              <strong className="text-white">100+ Components</strong> - Ready-to-use UI elements for any project
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <p className="text-zinc-400">
              <strong className="text-white">Copy & Paste Ready</strong> - No complex setup or configuration required
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <p className="text-zinc-400">
              <strong className="text-white">Modern Design</strong> - Inspired by the best design sources across the web
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <p className="text-zinc-400">
              <strong className="text-white">Free to Use</strong> - Open source and completely free for any project
            </p>
          </div>
        </div>
      </section>

      {/* Framework Support */}
      <section id="framework-support" className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Framework Support</h2>
        <p className="text-zinc-400">
          We support multiple frameworks out of the box, so whether you're building a quick landing page or a production-ready SaaS dashboard, AirflowUI fits right into your stack.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {name: 'HTML', icon: <SiHtml5 className="text-orange-500" /> },
                {name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
                {name: 'Vue.js', icon: <SiVuedotjs className="text-green-500" /> },
                {name: 'Svelte', icon: <SiSvelte className="text-orange-400" /> },
                {name: 'Astro', icon: <SiAstro className="text-purple-500" /> }
          ].map((framework) => (
            <div
              key={framework.name}
              className="flex items-center gap-3 px-3 py-6 rounded-lg bg-zinc-900/50 border border-zinc-800 transition-colors duration-200 hover:bg-zinc-800/70 cursor-pointer"
            >
              <span className="text-2xl">{framework.icon}</span>
              <span className="text-white font-medium">{framework.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Design Inspiration */}
      <section id="design-inspiration" className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Design Inspiration</h2>
        <p className="text-zinc-400">
          Our components are inspired by the very best design sources: CodePen experiments, Dribbble shots, award-winning websites from Awwwards.com, and modern UI trends seen across the web.
        </p>
        <p className="text-zinc-400">
          This means you'll always be working with designs that feel fresh, aesthetic, and ready for today's users.
        </p>
      </section>
    </div>
  );
};

export default Introduction;
