import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, BarChart, Hash } from 'lucide-react';

interface Document {
  file: File;
  name: string;
  size: number;
  status: string;
}

interface DocumentStatsProps {
  document: Document;
}

const DocumentStats: React.FC<DocumentStatsProps> = ({ document }) => {
  // Simulate stats calculation
  const estimatedPages = Math.ceil(document.size / (1024 * 50)); // Rough estimate
  const readingTime = Math.ceil(estimatedPages * 2); // 2 minutes per page
  const complexity = document.size > 1024 * 1024 * 5 ? 'High' : document.size > 1024 * 1024 * 2 ? 'Medium' : 'Low';

  const stats = [
    {
      icon: FileText,
      label: 'Est. Pages',
      value: estimatedPages.toString(),
      color: 'blue',
    },
    {
      icon: Clock,
      label: 'Reading Time',
      value: `${readingTime} min`,
      color: 'purple',
    },
    {
      icon: BarChart,
      label: 'Complexity',
      value: complexity,
      color: 'emerald',
    },
    {
      icon: Hash,
      label: 'File Size',
      value: `${(document.size / 1024 / 1024).toFixed(1)} MB`,
      color: 'orange',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="mt-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Document Statistics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`bg-${stat.color}-500/10 border border-${stat.color}-500/30 rounded-lg p-4 text-center`}
            >
              <Icon className={`h-8 w-8 text-${stat.color}-400 mx-auto mb-2`} />
              <div className="text-xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default DocumentStats;