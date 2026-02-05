import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Brain, Search, Zap, ArrowRight, Sparkles, BarChart3, Clock, Bookmark, Award, TrendingUp, Users } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: FileText,
      title: 'Smart PDF Analysis',
      description: 'Advanced text extraction with AI-powered document parsing and intelligent content recognition.',
      color: 'from-blue-500 to-cyan-500',
      stats: '99.9% accuracy',
    },
    {
      icon: Brain,
      title: 'AI-Powered Summaries',
      description: 'Generate comprehensive summaries using cutting-edge natural language processing and machine learning.',
      color: 'from-purple-500 to-pink-500',
      stats: '<30s processing',
    },
    {
      icon: Search,
      title: 'Related Research Discovery',
      description: 'Find relevant academic articles using intelligent search algorithms and semantic analysis.',
      color: 'from-emerald-500 to-teal-500',
      stats: '10M+ papers indexed',
    },
    {
      icon: BarChart3,
      title: 'Interactive Mind Maps',
      description: 'Create stunning visual mind maps with Mermaid.js integration and dynamic animations.',
      color: 'from-orange-500 to-red-500',
      stats: 'Real-time rendering',
    },
    {
      icon: Award,
      title: 'Novelty Scoring',
      description: 'AI-powered innovation assessment with detailed analysis of research originality and impact.',
      color: 'from-indigo-500 to-purple-500',
      stats: 'Patent-pending algorithm',
    },
    {
      icon: Clock,
      title: 'Reading Analytics',
      description: 'Comprehensive document metrics including complexity analysis and time estimation.',
      color: 'from-pink-500 to-rose-500',
      stats: 'Instant insights',
    },
  ];

  const stats = [
    { value: '50K+', label: 'Papers Analyzed', icon: FileText },
    { value: '99.9%', label: 'Accuracy Rate', icon: TrendingUp },
    { value: '<30s', label: 'Processing Time', icon: Clock },
    { value: '2K+', label: 'Researchers', icon: Users },
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Research Scientist, MIT',
      content: 'This tool has revolutionized how I analyze research papers. The AI summaries are incredibly accurate.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    },
    {
      name: 'Prof. Michael Rodriguez',
      role: 'Stanford University',
      content: 'The mind map feature helps me visualize complex research structures instantly. Absolutely brilliant!',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Harvard Medical School',
      content: 'The novelty scoring feature is a game-changer for evaluating research innovation and impact.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1, 1.05, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                repeatDelay: 2,
                ease: "easeInOut"
              }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <Sparkles className="h-20 w-20 text-yellow-500 mx-auto" />
                <motion.div
                  className="absolute inset-0 h-20 w-20 mx-auto"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-full h-full border-4 border-dashed border-yellow-400/30 rounded-full"></div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Research
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Revolution
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform your research workflow with AI-powered analysis, interactive visualizations, 
              and intelligent insights that accelerate discovery and innovation.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/analyzer">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <span>Start Analyzing</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-75"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 dark:bg-white/10 backdrop-blur-xl text-gray-900 dark:text-white px-10 py-4 rounded-2xl font-bold text-lg border border-gray-300 dark:border-white/20 hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300 shadow-xl"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-72 h-72 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-2xl"
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -100, 50, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="text-center group"
                >
                  <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 dark:border-white/10 hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-300 shadow-xl hover:shadow-2xl">
                    <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to analyze, understand, and discover insights from research papers with cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 dark:border-white/10 hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-500 shadow-xl hover:shadow-2xl overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <div className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700/50 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                      {feature.stats}
                    </div>
                  </div>
                  
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    initial={false}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Trusted by Researchers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See what leading researchers and academics are saying about our platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20 text-center overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 right-4 text-yellow-400/30"
            >
              <Zap className="h-8 w-8" />
            </motion.div>
            
            <Sparkles className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Transform Your Research?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of researchers who are already using AI to accelerate their work, 
              discover new insights, and push the boundaries of knowledge.
            </p>
            <Link to="/analyzer">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
              >
                Get Started Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;