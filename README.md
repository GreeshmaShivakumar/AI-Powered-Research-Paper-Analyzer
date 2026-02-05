# AI-Powered Research Paper Analyzer

An intelligent web application that analyzes research papers using AI to provide comprehensive insights, including summaries, novelty scores, mind maps, and related article recommendations.

## Features

- **PDF Analysis**: Upload and analyze research papers in PDF format
- **AI-Powered Summarization**: Automatic generation of paper summaries
- **Novelty Score**: Assessment of the paper's novelty and originality
- **Mind Map Visualization**: Visual representation of paper concepts and relationships
- **Related Articles**: AI-recommended papers and articles related to the uploaded document
- **Document Statistics**: Detailed metrics and analysis of document content
- **Progress Tracking**: Real-time analysis progress monitoring
- **Dark/Light Theme**: User-friendly interface with theme switching

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Context API** for state management
- **ESLint** for code quality

### Backend
- **Python Flask** for API server
- **AI/ML Integration** for intelligent analysis

## Project Structure

```
withUI/
├── project/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React context providers
│   │   ├── App.tsx            # Main app component
│   │   └── main.tsx           # Entry point
│   ├── app.py                 # Flask backend
│   ├── package.json           # Node dependencies
│   ├── vite.config.ts         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS config
│   └── tsconfig.json          # TypeScript config
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GreeshmaShivakumar/AI-Powered-Research-Paper-Analyzer.git
   cd AI-Powered-Research-Paper-Analyzer/withUI/project
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies** (if using backend)
   ```bash
   pip install -r requirements.txt
   ```

### Running the Application

#### Development Mode

1. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

2. **Start the Flask backend** (in a separate terminal)
   ```bash
   python app.py
   ```

#### Production Build

```bash
npm run build
npm run preview
```

## Components

### Key Components
- **AnalyzerPage**: Main analysis interface
- **PDFViewer**: PDF document viewer and manager
- **SummaryViewer**: Display paper summaries
- **NoveltyScore**: Show novelty assessment
- **MindMapViewer**: Interactive mind map visualization
- **RelatedArticles**: List of related papers
- **DocumentStats**: Paper statistics and metrics
- **AnalysisProgress**: Progress tracking during analysis
- **Navbar**: Navigation and theme switching

## API Endpoints

The Flask backend provides endpoints for:
- PDF upload and processing
- Analysis request handling
- Summary generation
- Novelty score calculation
- Related articles retrieval
- Document statistics

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Configuration Files

- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS customization
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.js` - ESLint rules and settings
- `postcss.config.js` - PostCSS plugins

## License

This project is open source and available under the MIT License.

## Author

Greeshma Shivakumar

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.
