import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RelatedArticles from '../components/RelatedArticles';
import { FileText, Brain, Search, Download, Share, Bookmark, Eye, Filter, Award, Sparkles } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import mermaid from 'mermaid';

const ResultsPage = () => {
  const { analysisData } = useAnalysis();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'summary' | 'mindmap' | 'articles' | 'novelty'>('summary');
  const [filterOpen, setFilterOpen] = useState(false);
  const mindmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Redirect to analyzer page if no analysis data is available
    if (!analysisData) {
      navigate('/analyzer');
      return;
    }

    // Initialize Mermaid with custom theme
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: '#1f2937',
        primaryBorderColor: '#2563eb',
        lineColor: '#6366f1',
        secondaryColor: '#8b5cf6',
        tertiaryColor: '#06b6d4',
        background: 'transparent',
        mainBkg: 'transparent',
      }
    });
  }, [analysisData, navigate]);

  // Render mind map when the mindmap tab is selected
  useEffect(() => {
    if (activeTab === 'mindmap' && analysisData?.mindmap && mindmapRef.current) {
      try {
        // Clear previous content
        mindmapRef.current.innerHTML = '';
        
        // Create a unique ID for this diagram
        const diagramId = `mermaid-${Date.now()}`;
        
        // Render the diagram
        mermaid.render(diagramId, analysisData.mindmap).then(result => {
          mindmapRef.current!.innerHTML = result.svg;
          
          // Add animations to SVG elements
          const svgElement = mindmapRef.current!.querySelector('svg');
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
        }).catch(error => {
          console.error('Mermaid rendering error:', error);
          mindmapRef.current!.innerHTML = `<div class="p-4 text-red-500">Error rendering mind map: ${error.message}</div>`;
        });
      } catch (error) {
        console.error('Error initializing mind map:', error);
      }
    }
  }, [activeTab, analysisData?.mindmap]);

  // Format summary text to remove unwanted characters
  const formatSummary = (text: string) => {
    if (!text) return [];
    
    // Split into paragraphs and filter out empty lines
    const paragraphs = text.split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0)
      // Remove ALL asterisks (not just at the beginning of lines)
      .map(p => p.replace(/\*/g, ''))
      // Remove markdown-style headers
      .map(p => p.replace(/^#+\s+/g, ''))
      // Remove other markdown formatting characters
      .map(p => p.replace(/\_/g, ''))
      .map(p => p.replace(/\`/g, ''))
      // Remove bullet points and numbered lists
      .map(p => p.replace(/^\s*[\-\+\d]+\.\s+/g, ''));
  
    return paragraphs;
  };

  const tabs = [
    { id: 'summary', label: 'AI Summary', icon: FileText, color: 'blue', available: !!analysisData?.summary },
    { id: 'mindmap', label: 'Mind Map', icon: Brain, color: 'purple', available: !!analysisData?.mindmap },
    { id: 'articles', label: 'Related Research', icon: Search, color: 'emerald', available: !!analysisData?.articles },
    { id: 'novelty', label: 'Novelty Score', icon: Award, color: 'pink', available: !!analysisData?.novelty },
  ];

  const actions = [
    { icon: Download, label: 'Export', color: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/30' },
    { icon: Share, label: 'Share', color: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-500/30' },
    { icon: Bookmark, label: 'Save', color: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-500/30' },
    { icon: Eye, label: 'View', color: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-500/30' },
  ];

  if (!analysisData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No Document Analyzed</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Please upload and analyze a document first.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg"
              >
                <Sparkles className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Analysis Results
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {analysisData.fileName}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {actions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-xl transition-all duration-300 shadow-lg ${action.color}`}
                    title={action.label}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.button>
                );
              })}
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterOpen(!filterOpen)}
                className="p-3 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300 shadow-lg"
              >
                <Filter className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex space-x-2 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-gray-200 dark:border-white/10 shadow-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isAvailable = tab.available;
              
              return (
                <motion.button
                  key={tab.id}
                  whileHover={isAvailable ? { scale: 1.02, y: -2 } : {}}
                  whileTap={isAvailable ? { scale: 0.98 } : {}}
                  onClick={() => isAvailable && setActiveTab(tab.id as any)}
                  disabled={!isAvailable}
                  className={`flex-1 flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                    isActive && isAvailable
                      ? `bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-600 text-white shadow-lg shadow-${tab.color}-500/25`
                      : isAvailable
                      ? 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/10'
                      : 'text-gray-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:inline font-semibold">{tab.label}</span>
                  {!isAvailable && (
                    <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">N/A</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl p-6"
        >
          {activeTab === 'summary' && analysisData.summary && (
            <div className="prose dark:prose-invert prose-lg max-w-none">
              {formatSummary(analysisData.summary).map((paragraph, index) => (
                <p key={index} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
          
          {activeTab === 'mindmap' && analysisData.mindmap && (
            <div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4 min-h-[400px] flex items-center justify-center">
                <div 
                  ref={mindmapRef} 
                  className="w-full overflow-auto"
                  style={{ minHeight: '400px' }}
                />
              </div>
              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-blue-600 dark:text-blue-300">
                <p>
                  <strong>Tip:</strong> You can click on nodes to expand/collapse branches. 
                  The mind map visualizes the key concepts and relationships in the research paper.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'articles' && analysisData.articles && (
            <RelatedArticles articles={analysisData.articles} />
          )}
          
          {activeTab === 'novelty' && analysisData?.novelty && (
            <div className="space-y-8">
              <div className="flex flex-col items-center justify-center mb-8">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                      <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">
                        {analysisData.novelty.overall_score}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 -mr-2 -mt-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                    <Award className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Novelty Score
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                  {analysisData.novelty.overall_assessment}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-blue-700 dark:text-blue-400">Methodological Innovation</h4>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">{analysisData.novelty.methodological_score}</span>
                  </div>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    {analysisData.novelty.methodological_reason}
                  </p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-purple-700 dark:text-purple-400">Conceptual Originality</h4>
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">{analysisData.novelty.conceptual_score}</span>
                  </div>
                  <p className="text-purple-700 dark:text-purple-300 text-sm">
                    {analysisData.novelty.conceptual_reason}
                  </p>
                </div>
                
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-emerald-700 dark:text-emerald-400">Potential Impact</h4>
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">{analysisData.novelty.impact_score}</span>
                  </div>
                  <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                    {analysisData.novelty.impact_reason}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Note:</strong> The novelty score evaluates the originality and potential impact of the research 
                  based on AI analysis. Scores range from 1-100, with higher scores indicating greater innovation.
                </p>
              </div>
            </div>
          )}
          
          {!tabs.find(tab => tab.id === activeTab)?.available && (
            <div className="p-6 text-center">
              <div className="text-gray-500 mb-4">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Results Available</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">This analysis hasn't been completed yet. Please run the analysis first.</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Analytics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-xl">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Document</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">File:</span>
                <span className="text-gray-900 dark:text-white font-medium">{analysisData.fileName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                <span className="text-green-600 dark:text-green-400 font-medium">Processed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Characters:</span>
                <span className="text-gray-900 dark:text-white font-medium">{analysisData.extractedText.length.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-500/20 rounded-xl">
                <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Analysis</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Summary:</span>
                <span className={`font-medium ${analysisData.summary ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                  {analysisData.summary ? 'Complete' : 'Pending'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Mind Map:</span>
                <span className={`font-medium ${analysisData.mindmap ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                  {analysisData.mindmap ? 'Complete' : 'Pending'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Articles:</span>
                <span className={`font-medium ${analysisData.articles ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                  {analysisData.articles?.length || 0} found
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl">
                <Search className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Insights</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Complexity:</span>
                <span className="text-gray-900 dark:text-white font-medium">High</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Est. Reading:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {Math.ceil(analysisData.extractedText.length / 1500)} min
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Key Topics:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {formatSummary(analysisData.summary).length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-pink-100 dark:bg-pink-500/20 rounded-xl">
                <Award className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Novelty</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Score:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {analysisData.novelty ? analysisData.novelty.overall_score : 'Coming Soon'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Innovation:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {analysisData.novelty ? analysisData.novelty.methodological_score : '--'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Impact:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {analysisData.novelty ? analysisData.novelty.impact_score : '--'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;