import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Article {
  title: string;
  description: string;
  url?: string;
  authors?: string[];
  date?: string;
  journal?: string;
  citations?: number;
}

interface AnalysisData {
  fileName: string;
  extractedText: string;
  summary: string;
  mindmap: string;
  articles: Article[];
  novelty?: {
    methodological_score: number;
    conceptual_score: number;
    impact_score: number;
    overall_score: number;
    methodological_reason: string;
    conceptual_reason: string;
    impact_reason: string;
    overall_assessment: string;
  };
}

interface AnalysisContextType {
  analysisData: AnalysisData | null;
  setAnalysisData: (data: AnalysisData) => void;
  clearAnalysisData: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};

interface AnalysisProviderProps {
  children: ReactNode;
}

export const AnalysisProvider: React.FC<AnalysisProviderProps> = ({ children }) => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  const clearAnalysisData = () => {
    setAnalysisData(null);
  };

  return (
    <AnalysisContext.Provider value={{ analysisData, setAnalysisData, clearAnalysisData }}>
      {children}
    </AnalysisContext.Provider>
  );
};