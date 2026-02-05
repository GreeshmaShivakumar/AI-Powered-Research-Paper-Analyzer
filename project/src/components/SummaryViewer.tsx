import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Share, BookOpen, Highlighter as Highlight, Volume2 } from 'lucide-react';

interface SummaryViewerProps {
  summary: string;
}

const SummaryViewer: React.FC<SummaryViewerProps> = ({ summary }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const actions = [
    { icon: Copy, label: copied ? 'Copied!' : 'Copy', onClick: handleCopy, color: 'blue' },
    { icon: Download, label: 'Export', onClick: () => {}, color: 'purple' },
    { icon: Share, label: 'Share', onClick: () => {}, color: 'emerald' },
    { icon: Volume2, label: 'Listen', onClick: () => {}, color: 'orange' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <BookOpen className="h-6 w-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">AI-Generated Summary</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.onClick}
                className={`p-2 bg-${action.color}-500/20 text-${action.color}-400 rounded-lg hover:bg-${action.color}-500/30 transition-colors`}
                title={action.label}
              >
                <Icon className="h-5 w-5" />
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="prose prose-invert max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 leading-relaxed text-lg"
          >
            {summary.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="flex items-center space-x-2 mb-2">
            <Highlight className="h-5 w-5 text-yellow-400" />
            <span className="text-white font-medium">Key Points</span>
          </div>
          <div className="text-sm text-gray-400">
            {summary.split('.').length - 1} key insights identified
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="h-5 w-5 text-blue-400" />
            <span className="text-white font-medium">Reading Level</span>
          </div>
          <div className="text-sm text-gray-400">
            Academic / Professional
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="flex items-center space-x-2 mb-2">
            <Volume2 className="h-5 w-5 text-green-400" />
            <span className="text-white font-medium">Est. Read Time</span>
          </div>
          <div className="text-sm text-gray-400">
            {Math.ceil(summary.length / 200)} minutes
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SummaryViewer;