import React from 'react';

const FutureEnhancements: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div id="overview">
        <h1 className="text-4xl font-semibold mb-4">Future Enhancements</h1>
        <p className="text-xl text-zinc-400">
          AirflowUI starts simple — copy & paste today, smarter tomorrow.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-4">
        <p className="text-zinc-400">
          Our future roadmap includes exciting features that will make AirflowUI not just save time — but make building UIs enjoyable, fast, and beautiful.
        </p>
      </section>

      {/* CLI Integration */}
      <section id="cli-integration" className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">CLI Integration</h2>
        <p className="text-zinc-400">
          Install components directly via command line interface for even faster development workflow.
        </p>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
          <code className="text-blue-400">npx airflowui add button</code>
        </div>
        <p className="text-zinc-400">
          This will automatically download and install components with all necessary dependencies and configurations.
        </p>
      </section>

      {/* Smart Search */}
      <section id="smart-search" className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Smart Search</h2>
        <p className="text-zinc-400">
          Find components using natural language queries, making discovery more intuitive than ever.
        </p>
        <div className="space-y-3">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <p className="text-zinc-300">
              <span className="text-blue-400">"dark mode pricing table"</span> → Returns all pricing components with dark theme variants
            </p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <p className="text-zinc-300">
              <span className="text-blue-400">"animated card hover effect"</span> → Shows cards with interactive animations
            </p>
          </div>
        </div>
      </section>

      {/* User Dashboard */}
      <section id="user-dashboard" className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">User Dashboard</h2>
        <p className="text-zinc-400">
          A personalized workspace for managing your component library usage and team collaboration.
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <p className="text-zinc-400">
              <strong className="text-white">Bookmark Components</strong> - Save your frequently used components for quick access
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <p className="text-zinc-400">
              <strong className="text-white">Organize Collections</strong> - Create custom collections for different projects
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <p className="text-zinc-400">
              <strong className="text-white">Share with Team</strong> - Collaborate and share component collections with team members
            </p>
          </div>
        </div>
      </section>

      {/* Full Templates */}
      <section id="full-templates" className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Full Templates</h2>
        <p className="text-zinc-400">
          Beyond individual components, we're building complete, ready-to-deploy templates for common use cases.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">Landing Pages</h3>
            <p className="text-zinc-400 text-sm">
              Complete landing page templates for SaaS, portfolios, and marketing sites.
            </p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">SaaS Dashboards</h3>
            <p className="text-zinc-400 text-sm">
              Full dashboard layouts with navigation, charts, and data visualization components.
            </p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">E-commerce</h3>
            <p className="text-zinc-400 text-sm">
              Product pages, shopping carts, and checkout flows for online stores.
            </p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">Portfolios</h3>
            <p className="text-zinc-400 text-sm">
              Professional portfolio templates for designers, developers, and creatives.
            </p>
          </div>
        </div>
      </section>

      {/* Analytics */}
      <section id="analytics" className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Analytics</h2>
        <p className="text-zinc-400">
          Discover what's trending in the component library ecosystem and make informed design decisions.
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <p className="text-zinc-400">
              <strong className="text-white">Trending Components</strong> - See which components are most popular this month
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <p className="text-zinc-400">
              <strong className="text-white">Most Copied Snippets</strong> - Identify the most useful code patterns
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <p className="text-zinc-400">
              <strong className="text-white">Community Favorites</strong> - Explore components loved by the developer community
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FutureEnhancements;
