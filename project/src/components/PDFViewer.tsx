import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ZoomIn, ZoomOut, RotateCw, Download } from 'lucide-react';

interface PDFViewerProps {
  file: File;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPdfUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
    >
      {/* Controls */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <FileText className="h-5 w-5 text-blue-400" />
          <span className="text-white font-medium truncate max-w-xs">
            {file.name}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          
          <span className="text-white text-sm px-3 py-1 bg-white/10 rounded">
            {zoom}%
          </span>
          
          <button
            onClick={handleZoomIn}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          
          <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
            <RotateCw className="h-4 w-4" />
          </button>
          
          <button className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* PDF Preview */}
      <div className="h-96 overflow-auto bg-gray-900/50">
        <div className="flex items-center justify-center h-full p-8">
          <div className="text-center">
            <FileText className="h-24 w-24 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">PDF Preview</h3>
            <p className="text-gray-400 mb-4">
              PDF preview will be displayed here once the viewer is integrated
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md">
              <div className="text-sm text-gray-300">
                <div className="flex justify-between mb-2">
                  <span>File:</span>
                  <span className="text-white">{file.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Size:</span>
                  <span className="text-white">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="text-white">PDF Document</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PDFViewer;