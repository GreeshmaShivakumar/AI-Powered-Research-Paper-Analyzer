import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAnalysis } from '../context/AnalysisContext';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const AnalyzerPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAnalysisData } = useAnalysis();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [processingStep, setProcessingStep] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Step 1: Extract text
      setProcessingStep('Extracting text from PDF...');
      const formData = new FormData();
      formData.append('file', file);
      
      const textResponse = await axios.post(`${API_URL}/extract-text`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const extractedText = textResponse.data.text;
      setExtractedText(extractedText);
      
      // Step 2: Generate summary
      setProcessingStep('Generating research summary...');
      const summaryResponse = await axios.post(`${API_URL}/generate-summary`, {
        text: extractedText
      });
      
      // Step 3: Generate mind map
      setProcessingStep('Creating mind map visualization...');
      const mindmapResponse = await axios.post(`${API_URL}/generate-mindmap`, {
        text: extractedText
      });
      
      // Step 4: Find related articles
      setProcessingStep('Finding related research articles...');
      const articlesResponse = await axios.post(`${API_URL}/find-related-articles`, {
        summary: summaryResponse.data.summary
      });
      
      // Step 5: Calculate novelty score
      setProcessingStep('Calculating research novelty score...');
      const noveltyResponse = await axios.post(`${API_URL}/calculate-novelty`, {
        text: extractedText,
        summary: summaryResponse.data.summary
      });
      
      // Store all results in context
      setAnalysisData({
        fileName: file.name,
        extractedText: extractedText,
        summary: summaryResponse.data.summary,
        mindmap: mindmapResponse.data.mindmap,
        articles: articlesResponse.data.articles,
        novelty: noveltyResponse.data.novelty
      });
      
      // Navigate to results page
      navigate('/results');
      
    } catch (error) {
      console.error('Error processing PDF:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during processing');
    } finally {
      setLoading(false);
      setProcessingStep('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Research Paper Analyzer
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Upload your research paper in PDF format to generate an automated summary, 
          visual mind map, and discover related academic articles.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <input
              type="file"
              id="pdfUpload"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <label 
              htmlFor="pdfUpload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <svg 
                className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              <span className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                {file ? file.name : 'Click to select a PDF file'}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-500">
                Maximum file size: 10MB
              </span>
            </label>
          </div>
          
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 rounded-lg">
              {error}
            </div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !file}
            className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg 
              ${loading || !file 
                ? 'bg-blue-400 dark:bg-blue-600 cursor-not-allowed' 
                : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
              } transition-colors duration-200`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {processingStep || 'Processing...'}
              </div>
            ) : (
              'Analyze Research Paper'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AnalyzerPage;