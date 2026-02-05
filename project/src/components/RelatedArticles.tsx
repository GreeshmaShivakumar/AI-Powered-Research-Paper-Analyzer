import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Bookmark, Share, Star, Calendar, User } from 'lucide-react';

interface Article {
  title: string;
  description: string;
  url?: string;
  authors?: string[];
  date?: string;
  journal?: string;
  citations?: number;
}

interface RelatedArticlesProps {
  articles: Article[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles }) => {
  const [filter, setFilter] = useState<'all' | 'recent' | 'highly-cited'>('all');
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());

  // Debug: Log articles to console
  React.useEffect(() => {
    console.log('RelatedArticles received:', articles);
    articles.forEach((article, i) => {
      console.log(`Article ${i + 1}:`, {
        title: article.title,
        hasUrl: !!article.url,
        url: article.url
      });
    });
  }, [articles]);

  const toggleBookmark = (index: number) => {
    const newBookmarked = new Set(bookmarked);
    if (newBookmarked.has(index)) {
      newBookmarked.delete(index);
    } else {
      newBookmarked.add(index);
    }
    setBookmarked(newBookmarked);
  };

  const filterButtons = [
    { id: 'all', label: 'All Articles', icon: Search },
    { id: 'recent', label: 'Recent', icon: Calendar },
    { id: 'highly-cited', label: 'Highly Cited', icon: Star },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <Search className="h-6 w-6 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Related Articles</h2>
          <span className="bg-emerald-500/20 text-emerald-400 text-sm px-3 py-1 rounded-full">
            {articles.length} found
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {filterButtons.map((button) => {
            const Icon = button.icon;
            const isActive = filter === button.id;
            
            return (
              <motion.button
                key={button.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(button.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{button.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                {article.url && article.url !== '#' ? (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors cursor-pointer hover:underline">
                      {article.title}
                    </h3>
                  </a>
                ) : (
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>
                )}
                
                {article.authors && (
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {article.authors.join(', ')}
                    </span>
                  </div>
                )}
                
                {article.url && article.url !== '#' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <ExternalLink className="h-4 w-4 text-blue-400" />
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 underline break-all"
                    >
                      {article.url}
                    </a>
                  </div>
                )}
                
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                  {article.date && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                  )}
                  
                  {article.journal && (
                    <span className="bg-white/10 px-2 py-1 rounded">
                      {article.journal}
                    </span>
                  )}
                  
                  {article.citations && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>{article.citations} citations</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleBookmark(index)}
                  className={`p-2 rounded-lg transition-colors ${
                    bookmarked.has(index)
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <Bookmark className="h-5 w-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/10 text-gray-400 rounded-lg hover:bg-white/20 hover:text-white transition-colors"
                >
                  <Share className="h-5 w-5" />
                </motion.button>
                
                {article.url && article.url !== '#' && (
                  <motion.a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                    title="Open paper in new tab"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </motion.a>
                )}
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              {article.description}
            </p>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">
                    Research Paper
                  </span>
                  <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">
                    Peer Reviewed
                  </span>
                </div>
                
                <div className="text-sm text-gray-400">
                  Relevance: <span className="text-emerald-400 font-medium">95%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {articles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Articles Found</h3>
          <p className="text-gray-400">
            We couldn't find any related articles at the moment. Try analyzing your document first.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RelatedArticles;