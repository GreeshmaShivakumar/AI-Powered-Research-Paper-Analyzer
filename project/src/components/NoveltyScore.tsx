import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Award, Lightbulb, Star } from 'lucide-react';

interface NoveltyScoreProps {
  noveltyData: {
    score: number;
    explanation: string;
    factors: string[];
  };
}

const NoveltyScore: React.FC<NoveltyScoreProps> = ({ noveltyData }) => {
  const { score, explanation, factors } = noveltyData;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    if (score >= 40) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-pink-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Highly Novel';
    if (score >= 60) return 'Moderately Novel';
    if (score >= 40) return 'Somewhat Novel';
    return 'Limited Novelty';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return Award;
    if (score >= 60) return TrendingUp;
    if (score >= 40) return Lightbulb;
    return Star;
  };

  const ScoreIcon = getScoreIcon(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl"
    >
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="relative p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl blur opacity-75"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Novelty Score</h3>
            <p className="text-gray-600 dark:text-gray-400">AI-powered innovation assessment</p>
          </div>
        </div>

        {/* Score Display */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative inline-block"
          >
            <div className="relative w-32 h-32 mx-auto mb-4">
              {/* Background Circle */}
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                {/* Progress Circle */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: score / 100 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  style={{
                    strokeDasharray: "314.16",
                    strokeDashoffset: "314.16",
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" className="text-purple-500" stopColor="currentColor" />
                    <stop offset="100%" className="text-pink-500" stopColor="currentColor" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Score Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-3xl font-bold text-gray-900 dark:text-white"
                  >
                    {score}
                  </motion.div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">out of 100</div>
                </div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${getScoreColor(score)} text-white font-semibold shadow-lg`}
            >
              <ScoreIcon className="h-5 w-5" />
              <span>{getScoreLabel(score)}</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Analysis</h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            {explanation}
          </p>
        </motion.div>

        {/* Factors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Factors</h4>
          <div className="space-y-2">
            {factors.map((factor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">{factor}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Math.round(score * 0.8)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Originality</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {Math.round(score * 0.9)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Impact</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NoveltyScore;