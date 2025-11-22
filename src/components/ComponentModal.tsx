import React, { useState } from 'react';
import type { Component } from '../services/componentService';

// Function to format HTML/JSX code with proper indentation
const formatCode = (code: string): string => {
  if (!code) return '';
  
  // Remove extra whitespace and normalize
  let formatted = code.trim();
  
  // Add line breaks after > and before < for better readability
  formatted = formatted.replace(/>\s*</g, '>\n<');
  
  // Add proper indentation
  const lines = formatted.split('\n');
  let indentLevel = 0;
  const indentSize = 2;
  
  const formattedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    
    // Decrease indent for closing tags
    if (trimmed.startsWith('</')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }
    
    const indentedLine = ' '.repeat(indentLevel * indentSize) + trimmed;
    
    // Increase indent for opening tags (but not self-closing)
    if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
      indentLevel++;
    }
    
    return indentedLine;
  });
  
  return formattedLines.join('\n');
};

interface ComponentModalProps {
  isOpen: boolean;
  onClose: () => void;
  component: Component | null;
}

const ComponentModal: React.FC<ComponentModalProps> = ({ isOpen, onClose, component }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen || !component) return null;

  const copyToClipboard = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-700">
          <div>
            <h2 className="text-2xl font-semibold text-white">{component.name}</h2>
            {component.description && (
              <p className="text-zinc-400 mt-1">{component.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex">
          {/* Left Side - Preview */}
          <div className="w-1/2 p-6 border-r border-zinc-700">
            <h3 className="text-lg font-medium text-white mb-4">Preview</h3>
            <div 
              className={`${component.preview?.background || 'bg-zinc-800'} rounded-lg p-8 h-full min-h-[300px] border border-zinc-700`}
            >
              <div className={component.preview?.containerClass || 'flex items-center justify-center h-full'}>
                {component.frameworks[selectedLanguage] && (
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: component.frameworks[selectedLanguage].code 
                    }} 
                  />
                )}
              </div>
            </div>

            {/* Component Info */}
            <div className="mt-4 space-y-2">
              <div className="flex flex-wrap gap-2">
                {component.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded border border-zinc-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-zinc-400">
                Difficulty: <span className="text-zinc-300 capitalize">{component.difficulty}</span>
              </p>
            </div>
          </div>

          {/* Right Side - Code */}
          <div className="w-1/2 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Code</h3>
              
              {/* Language Tabs */}
              {component.frameworks.length > 1 && (
                <div className="flex bg-zinc-800 rounded-lg p-1">
                  {component.frameworks.map((framework, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedLanguage(index)}
                      className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                        selectedLanguage === index
                          ? 'bg-blue-600 text-white'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {framework.language}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Code Block */}
            <div className="bg-zinc-950 border border-zinc-700 rounded-lg flex-1 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700">
                <span className="text-sm text-zinc-400">
                  {component.frameworks[selectedLanguage]?.language || 'Code'}
                </span>
                <button
                  onClick={() => copyToClipboard(component.frameworks[selectedLanguage]?.code || '', selectedLanguage)}
                  className="flex items-center gap-2 px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-white text-sm rounded transition-colors"
                >
                  {copiedIndex === selectedLanguage ? (
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
              
              <div className="flex-1 overflow-auto">
                <pre className="p-4 text-sm text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono">
                  <code>{formatCode(component.frameworks[selectedLanguage]?.code || '')}</code>
                </pre>
              </div>
            </div>

            {/* Dependencies */}
            {component.frameworks[selectedLanguage]?.dependencies?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-white mb-2">Dependencies</h4>
                <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700">
                  <code className="text-sm text-zinc-300">
                    {component.frameworks[selectedLanguage].dependencies.join(' ')}
                  </code>
                </div>
              </div>
            )}

            {/* Notes */}
            {component.frameworks[selectedLanguage]?.notes && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-white mb-2">Notes</h4>
                <p className="text-sm text-zinc-400 bg-zinc-800 rounded-lg p-3 border border-zinc-700">
                  {component.frameworks[selectedLanguage].notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentModal;