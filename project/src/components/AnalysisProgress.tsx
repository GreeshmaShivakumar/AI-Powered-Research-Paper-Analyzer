import React from 'react';
import { motion } from 'framer-motion';
import { Brain, FileText, Search, CheckCircle } from 'lucide-react';

interface AnalysisProgressProps {
  summaryLoading: boolean;
  mindmapLoading: boolean;
  articlesLoading: boolean;
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({
  summaryLoading,
  mindmapLoading,
  articlesLoading,
}) => {
  const steps = [
    {
      id: 'summary',
      label: 'AI Summary',
      icon: FileText,
      loading: summaryLoading,
      color: 'blue',
    },
    {
      id: 'mindmap',
      label: 'Mind Map',
      icon: Brain,
      loading: mindmapLoading,
      color: 'purple',
    },
    {
      id: 'articles',
      label: 'Related Articles',
      icon: Search,
      loading: articlesLoading,
      color: 'emerald',
    },
  ];

  const activeSteps = steps.filter(step => step.loading);

  if (activeSteps.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Analysis in Progress</h3>
      
      <div className="space-y-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = step.loading;
          
          return (
            <div
              key={step.id}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                isActive ? `bg-${step.color}-500/10 border border-${step.color}-500/30` : 'bg-white/5'
              }`}
            >
              <div className={`p-2 rounded-lg ${isActive ? `bg-${step.color}-500/20` : 'bg-gray-700'}`}>
                {isActive ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Icon className={`h-5 w-5 text-${step.color}-400`} />
                  </motion.div>
                ) : (
                  <Icon className="h-5 w-5 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1">
                <div className={`font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                  {step.label}
                </div>
                {isActive && (
                  <div className="text-sm text-gray-400">Processing...</div>
                )}
              </div>
              
              {isActive && (
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-2 h-2 bg-${step.color}-400 rounded-full`}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-400">
          This may take a few moments to complete
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisProgress;