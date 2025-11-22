import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type Language = 'html' | 'nextjs' | 'vue' | 'astro' | 'svelte';

interface Framework {
  language: Language;
  code: string;
  dependencies: string[];
  notes: string;
}

interface ComponentData {
  componentId: string;
  name: string;
  description: string;
  frameworks: Framework[];
  category: string;
  subcategory: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  preview: {
    background: string;
    height: string;
    width: string;
    containerClass: string;
  };
}

export default function CodeEditor() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  
  // Form states
  const [componentData, setComponentData] = useState<ComponentData>({
    componentId: '',
    name: '',
    description: '',
    frameworks: [],
    category: 'button',
    subcategory: '',
    tags: [],
    difficulty: 'beginner',
    preview: {
      background: 'bg-zinc-900',
      height: '250px',
      width: '250px',
      containerClass: 'flex items-center justify-center'
    }
  });

  const [selectedLanguage, setSelectedLanguage] = useState<Language>('html');
  const [currentCode, setCurrentCode] = useState('');
  const [currentDependencies, setCurrentDependencies] = useState('');
  const [currentNotes, setCurrentNotes] = useState('');
  const [tagInput, setTagInput] = useState('');
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const languages: Language[] = ['html', 'nextjs', 'vue', 'astro', 'svelte'];
  const categories = ['button', 'input', 'card', 'modal', 'navigation', 'form', 'layout'];
  const difficulties: ('beginner' | 'intermediate' | 'advanced')[] = ['beginner', 'intermediate', 'advanced'];

  useEffect(() => {
    // Check if user is authenticated and is admin
    if (!user || user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    // Load current framework code when switching languages
    const existingFramework = componentData.frameworks.find(f => f.language === selectedLanguage);
    if (existingFramework) {
      setCurrentCode(existingFramework.code);
      setCurrentDependencies(existingFramework.dependencies.join(', '));
      setCurrentNotes(existingFramework.notes);
    } else {
      setCurrentCode('');
      setCurrentDependencies('');
      setCurrentNotes('');
    }
  }, [selectedLanguage, componentData.frameworks]);

  const saveCurrentFramework = () => {
    if (!currentCode.trim()) return;

    const updatedFrameworks = componentData.frameworks.filter(f => f.language !== selectedLanguage);
    const newFramework: Framework = {
      language: selectedLanguage,
      code: currentCode.trim(),
      dependencies: currentDependencies.split(',').map(d => d.trim()).filter(Boolean),
      notes: currentNotes.trim()
    };

    setComponentData(prev => ({
      ...prev,
      frameworks: [...updatedFrameworks, newFramework]
    }));
  };

  const handleLanguageSwitch = (language: Language) => {
    saveCurrentFramework();
    setSelectedLanguage(language);
  };

  const addTag = () => {
    if (tagInput.trim() && !componentData.tags.includes(tagInput.trim())) {
      setComponentData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim().toLowerCase()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setComponentData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const generateComponentId = () => {
    const name = componentData.name.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .slice(0, 30);
    
    setComponentData(prev => ({ ...prev, componentId: name }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Save current framework before submitting
      saveCurrentFramework();

      // Validation
      if (!componentData.name.trim()) {
        throw new Error('Component name is required');
      }
      if (!componentData.componentId.trim()) {
        throw new Error('Component ID is required');
      }
      if (componentData.frameworks.length === 0) {
        throw new Error('At least one framework implementation is required');
      }

      const submitData = {
        ...componentData,
        frameworks: [...componentData.frameworks]
      };

      // If current code exists but isn't saved, add it
      if (currentCode.trim()) {
        const existingIndex = submitData.frameworks.findIndex(f => f.language === selectedLanguage);
        const framework: Framework = {
          language: selectedLanguage,
          code: currentCode.trim(),
          dependencies: currentDependencies.split(',').map(d => d.trim()).filter(Boolean),
          notes: currentNotes.trim()
        };

        if (existingIndex >= 0) {
          submitData.frameworks[existingIndex] = framework;
        } else {
          submitData.frameworks.push(framework);
        }
      }

      const baseURL = import.meta.env.VITE_API_URL || 'https://airflow-ob6u.onrender.com/api';
      const response = await fetch(`${baseURL}/admin/components`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create component');
      }

      setSuccess('Component created successfully!');
      
      // Reset form after 2 seconds
      setTimeout(() => {
        navigate('/admin/' + user?.id);
      }, 2000);

    } catch (err) {
      console.error('Create component error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create component');
    } finally {
      setLoading(false);
    }
  };

  const renderPreview = () => {
    if (!currentCode.trim()) {
      return (
        <div className="h-full flex items-center justify-center text-zinc-500">
          <div className="text-center">
            <div className="text-4xl mb-4">📝</div>
            <p>Write some code to see the preview</p>
          </div>
        </div>
      );
    }

    try {
      return (
        <div 
          className={`h-full rounded-lg ${componentData.preview.containerClass || 'flex items-center justify-center'}`}
          style={{ 
            minHeight: componentData.preview.height,
            width: '100%'
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: currentCode }} />
        </div>
      );
    } catch (err) {
      return (
        <div className="h-full flex items-center justify-center text-red-400">
          <div className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <p>Error rendering preview</p>
          </div>
        </div>
      );
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-zinc-400">Admin access required</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">Component Code Editor</h1>
              <p className="text-zinc-400 text-sm">Create and test UI components</p>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/admin/' + user.id)}
            className="px-4 py-2 text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-600 rounded-lg transition-colors"
          >
            Back to Admin
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        {error && (
          <div className="bg-red-900/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-900/20 border border-green-600 text-green-400 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        {/* Component Metadata Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Component Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Component Name</label>
                <input
                  type="text"
                  value={componentData.name}
                  onChange={(e) => setComponentData(prev => ({ ...prev, name: e.target.value }))}
                  onBlur={generateComponentId}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Save Button"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Component ID</label>
                <input
                  type="text"
                  value={componentData.componentId}
                  onChange={(e) => setComponentData(prev => ({ ...prev, componentId: e.target.value }))}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g., save-button"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
                <textarea
                  value={componentData.description}
                  onChange={(e) => setComponentData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 h-20"
                  placeholder="Brief description of the component..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Category</label>
                <select
                  value={componentData.category}
                  onChange={(e) => setComponentData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Difficulty</label>
                <select
                  value={componentData.difficulty}
                  onChange={(e) => setComponentData(prev => ({ ...prev, difficulty: e.target.value as any }))}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>{diff.charAt(0).toUpperCase() + diff.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Add tag"
                  />
                  <button
                    onClick={addTag}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {componentData.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-zinc-700 text-zinc-300 text-sm rounded flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-zinc-500 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Code Editor and Preview */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            {/* Language Tabs */}
            <div className="flex border-b border-zinc-800">
              {languages.map(lang => (
                <button
                  key={lang}
                  onClick={() => handleLanguageSwitch(lang)}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                    selectedLanguage === lang
                      ? 'bg-blue-600 text-white border-b-2 border-blue-400'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  {componentData.frameworks.some(f => f.language === lang) && (
                    <span className="ml-1 text-green-400">✓</span>
                  )}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-96">
              {/* Code Editor */}
              <div className="border-r border-zinc-800 flex flex-col">
                <div className="p-4 border-b border-zinc-800">
                  <h4 className="font-medium text-white">Code ({selectedLanguage})</h4>
                </div>
                <textarea
                  value={currentCode}
                  onChange={(e) => setCurrentCode(e.target.value)}
                  className="flex-1 p-4 bg-zinc-950 text-white font-mono text-sm resize-none focus:outline-none"
                  placeholder={`Write your ${selectedLanguage} code here...`}
                />
                
                {/* Dependencies and Notes */}
                <div className="border-t border-zinc-800 p-4 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Dependencies (comma-separated)</label>
                    <input
                      type="text"
                      value={currentDependencies}
                      onChange={(e) => setCurrentDependencies(e.target.value)}
                      className="w-full px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                      placeholder="e.g., tailwindcss, react"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Notes</label>
                    <input
                      type="text"
                      value={currentNotes}
                      onChange={(e) => setCurrentNotes(e.target.value)}
                      className="w-full px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                      placeholder="Implementation notes..."
                    />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="flex flex-col">
                <div className="p-4 border-b border-zinc-800">
                  <h4 className="font-medium text-white">Preview</h4>
                </div>
                <div className={`flex-1 ${componentData.preview.background} p-4`}>
                  {renderPreview()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate('/admin/' + user.id)}
            className="px-6 py-3 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !componentData.name || componentData.frameworks.length === 0}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white rounded-lg font-medium transition-colors"
          >
            {loading ? 'Creating...' : 'Create Component'}
          </button>
        </div>
      </div>
    </div>
  );
}