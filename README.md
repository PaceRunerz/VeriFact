

# VeriFact 🔍

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> An AI-powered platform for detecting misinformation and verifying news credibility through advanced multi-modal analysis.

![VeriFact Banner](https://via.placeholder.com/1200x400/667eea/ffffff?text=VeriFact+-+Truth+in+the+Digital+Age)

## 🌟 Overview

VeriFact combines cutting-edge AI technology with real-time fact-checking to help users identify fake news, deepfakes, and misleading content. In an era of information overload, VeriFact serves as your trusted companion for navigating the digital landscape with confidence.

### Why VeriFact?

- **Multi-Modal Analysis**: Analyze text, URLs, and images with sophisticated AI models
- **Real-Time Verification**: Ground-truth checking against current events using live search
- **Visual Forensics**: Detect AI-generated images and deepfake manipulation
- **Source Credibility**: Evaluate the trustworthiness of news sources and domains
- **User-Friendly**: Clean, intuitive interface designed for everyone

## ✨ Features

### 📝 Text Scan
Analyze headlines and articles for signs of misinformation, bias, and manipulative language patterns.

- Sentiment analysis and bias detection
- Claim extraction and verification
- Credibility scoring with detailed explanations
- Citation and source checking

### 🔗 URL Trace
Verify the credibility of specific news links by analyzing domain reputation, content consistency, and source reliability.

- Domain authority assessment
- Cross-reference with fact-checking databases
- Content freshness and update tracking
- Source reputation scoring

### 🖼️ Forensics
Upload images to detect AI manipulation, deepfakes, and visual misinformation.

- Deepfake detection using advanced neural networks
- Metadata analysis and EXIF data verification
- Reverse image search integration
- Manipulation artifact detection

### 🌐 Real-Time Grounding
Leverage Google Search integration to verify claims against the latest information and breaking news.

- Live fact-checking against current events
- Multi-source corroboration
- Timeline verification for dated claims
- Contextual accuracy assessment

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- A Gemini API key (get one from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/verifact-ai.git
   cd verifact-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

   **Security Note**: Never commit your `.env` file. It's already included in `.gitignore` to protect your credentials.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to start using VeriFact.

### Building for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
verifact-ai/
├── src/
│   ├── components/       # React components
│   ├── services/         # API integration services
│   ├── utils/            # Helper functions
│   ├── styles/           # CSS and styling
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── public/               # Static assets
├── .env                  # Environment variables (not committed)
├── .gitignore            # Git ignore rules
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
└── README.md             # This file
```

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **AI/ML**: Google Gemini API
- **Search Integration**: Google Search API
- **Image Analysis**: Computer Vision APIs
- **Deployment**: Vercel/Netlify compatible

## 🔒 Security & Privacy

VeriFact takes your privacy seriously:

- **No Data Storage**: We don't store your queries or uploaded content
- **Secure API Calls**: All communications are encrypted via HTTPS
- **Environment Variables**: Sensitive keys are never exposed to the client
- **Open Source**: Full transparency in how your data is processed


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🗺️ Roadmap

- [ ] Browser extension for real-time verification
- [ ] Mobile application (iOS & Android)
- [ ] Multi-language support
- [ ] Community fact-checking network
- [ ] API access for developers
- [ ] Chrome/Firefox plugin integration

---

<p align="center">
  Made with ❤️ by PaceRunerz
  <br>
  <strong>Truth Matters. Verify Before You Share.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>
