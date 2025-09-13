import React from 'react';

const UsageDirection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div id="overview">
        <h1 className="text-4xl font-semibold mb-4">Usage Direction</h1>
        <p className="text-xl text-zinc-400">
          Learn how to use AirflowUI components in your projects efficiently.
        </p>
      </div>

      {/* How to Use */}
      <section id="how-to-use" className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">How to Use</h2>
        <p className="text-zinc-400 mb-6">
          Using AirflowUI is as simple as:
        </p>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
              1
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Browse Components</h3>
              <p className="text-zinc-400">
                Pick the element you want (e.g., Button, Card, Modal, Navbar) from our extensive library.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
              2
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Choose Framework</h3>
              <p className="text-zinc-400">
                Select from HTML, Next.js, Vite.js, Astro, Vue, or Svelte based on your project needs.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
              3
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Copy the Snippet</h3>
              <p className="text-zinc-400">
                Grab the ready-made code with a simple click of the copy button.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
              4
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Paste & Run</h3>
              <p className="text-zinc-400">
                Drop it into your project. Done. No additional setup required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Tips */}
      <section id="customization-tips" className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Customization Tips</h2>
        <p className="text-zinc-400 mb-4">
          Want to customize? Here are some ways to make components your own:
        </p>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Change Tailwind Classes</h3>
            <p className="text-zinc-400">
              Modify colors, padding, borders, and other styling properties using Tailwind CSS classes for quick tweaks.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Add Animations</h3>
            <p className="text-zinc-400">
              Integrate GSAP or Motion One for smooth animations and micro-interactions.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">3D Elements</h3>
            <p className="text-zinc-400">
              Add Three.js integration if you want to incorporate interactive 3D elements into your components.
            </p>
          </div>
        </div>
      </section>

      {/* Example Workflow */}
      <section id="example-workflow" className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Example Workflow</h2>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
          <p className="text-zinc-400 mb-4">
            <strong className="text-white">Example:</strong> Need a button? Here's how quick it is:
          </p>
          <ol className="space-y-2 text-zinc-400">
            <li>1. Navigate to the Button component section</li>
            <li>2. Choose your framework (e.g., React)</li>
            <li>3. Copy the button code snippet</li>
            <li>4. Paste it into your project</li>
            <li>5. Customize colors or styling as needed</li>
            <li>6. You're done in seconds!</li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default UsageDirection;
