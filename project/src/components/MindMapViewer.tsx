import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Download, Share, ZoomIn, ZoomOut, Maximize, RefreshCw, Eye, Code } from 'lucide-react';
import mermaid from 'mermaid';

interface MindMapViewerProps {
  mindmapCode: string;
}

const MindMapViewer: React.FC<MindMapViewerProps> = ({ mindmapCode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMermaid = async () => {
      if (!mindmapCode || !containerRef.current) return;

      setIsLoading(true);
      setError(null);

      try {
        // Initialize mermaid with custom theme
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#3b82f6',
            primaryTextColor: '#1f2937',
            primaryBorderColor: '#2563eb',
            lineColor: '#6366f1',
            secondaryColor: '#8b5cf6',
            tertiaryColor: '#06b6d4',
            background: '#ffffff',
            mainBkg: '#f8fafc',
            secondBkg: '#e2e8f0',
            tertiaryBkg: '#cbd5e1',
          },
          mindmap: {
            padding: 20,
            maxNodeWidth: 200,
          },
          flowchart: {
            htmlLabels: true,
            curve: 'basis',
          },
        });

        // Clear previous content
        containerRef.current.innerHTML = '';

        // Create a unique ID for this diagram
        const diagramId = `mermaid-${Date.now()}`;
        
        // Render the diagram
        const { svg } = await mermaid.render(diagramId, mindmapCode);
        
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          
          // Add animations to SVG elements
          const svgElement = containerRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.width = '100%';
            svgElement.style.height = 'auto';
            svgElement.style.maxWidth = '100%';
            
            // Animate nodes
            const nodes = svgElement.querySelectorAll('.node');
            nodes.forEach((node, index) => {
              const element = node as HTMLElement;
              element.style.opacity = '0';
              element.style.transform = 'scale(0.5)';
              element.style.transition = `all 0.6s ease ${index * 0.1}s`;
              
              setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
              }, 100);
            });

            // Animate edges
            const edges = svgElement.querySelectorAll('.edge');
            edges.forEach((edge, index) => {
              const element = edge as HTMLElement;
              element.style.opacity = '0';
              element.style.transition = `opacity 0.8s ease ${index * 0.05 + 0.3}s`;
              
              setTimeout(() => {
                element.style.opacity = '1';
              }, 100);
            });
          }
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError('Failed to render mind map. Please check the diagram syntax.');
        setIsLoading(false);
      }
    };

    initializeMermaid();
  }, [mindmapCode]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleReset = () => setZoom(1);

  const actions = [
    { icon: Eye, label: 'Toggle Code', onClick: () => setShowCode(!showCode), color: 'blue', active: showCode },
    { icon: ZoomIn, label: 'Zoom In', onClick: handleZoomIn, color: 'emerald' },
    { icon: ZoomOut, label: 'Zoom Out', onClick: handleZoomOut, color: 'orange' },
    { icon: RefreshCw, label: 'Reset', onClick: handleReset, color: 'purple' },
    { icon: Download, label: 'Export', onClick: () => {}, color: 'pink' },
    { icon: Share, label: 'Share', onClick: () => {}, color: 'indigo' },
    { icon: Maximize, label: 'Fullscreen', onClick: () => {}, color: 'red' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
            <Brain className="h-6 w-6 text-white" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl blur opacity-75"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Interactive Mind Map</h2>
            <p className="text-gray-600 dark:text-gray-400">AI-generated visual knowledge structure</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.onClick}
                className={`p-2 rounded-xl transition-all duration-300 shadow-lg ${
                  action.active 
                    ? `bg-${action.color}-500 text-white shadow-${action.color}-500/25` 
                    : `bg-${action.color}-100 dark:bg-${action.color}-500/20 text-${action.color}-600 dark:text-${action.color}-400 hover:bg-${action.color}-200 dark:hover:bg-${action.color}-500/30`
                }`}
                title={action.label}
              >
                <Icon className="h-5 w-5" />
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mind Map Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`${showCode ? 'lg:col-span-2' : 'lg:col-span-3'} bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Visual Representation</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Zoom: {Math.round(zoom * 100)}%</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden min-h-96">
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10"
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
                      />
                      <p className="text-gray-600 dark:text-gray-400">Generating mind map...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {error ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center p-8"
                >
                  <div className="text-center max-w-md">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Rendering Error</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.location.reload()}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Retry
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
                  transition={{ duration: 0.3 }}
                  className="p-6 w-full h-full flex items-center justify-center"
                  ref={containerRef}
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Code Panel */}
        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Code className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mermaid Code</h3>
                </div>
                
                <div className="bg-gray-900 rounded-xl p-4 overflow-auto max-h-96">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                    {mindmapCode}
                  </pre>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigator.clipboard.writeText(mindmapCode)}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    Copy Code
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open('https://mermaid.live', '_blank')}
                    className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
                  >
                    Open in Editor
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 rounded-xl p-4 border border-blue-200 dark:border-blue-500/20"
      >
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Mind Map Tips</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use zoom controls to explore details. Click "Toggle Code" to see the Mermaid syntax. 
              You can copy the code and use it in other Mermaid-compatible tools.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MindMapViewer;