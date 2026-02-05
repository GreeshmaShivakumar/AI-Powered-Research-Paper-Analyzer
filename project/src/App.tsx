import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import HomePage from './pages/HomePage';
import AnalyzerPage from './pages/AnalyzerPage';
import ResultsPage from './pages/ResultsPage';
import { AnalysisProvider } from './context/AnalysisContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AnalysisProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden transition-all duration-500">
            <ParticleBackground />
            <div className="relative z-10">
              <Navbar />
              <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/analyzer" element={<AnalyzerPage />} />
                  <Route path="/results" element={<ResultsPage />} />
                </Routes>
              </motion.main>
            </div>
          </div>
        </Router>
      </AnalysisProvider>
    </ThemeProvider>
  );
}

export default App;