# 🔮 Gopher Browser - Resurrection

A modern web interface for the ancient Gopher protocol (RFC 1436), bringing dead technology back to life with contemporary innovations.

## 🎃 Kiroween Hackathon Submission

**Category:** Resurrection  
**Theme:** Bringing the Gopher protocol (1991) back to life with a modern, haunting retro-futuristic interface

### Why This Matters

The Gopher protocol predates the World Wide Web and was once the dominant way to navigate the internet. While HTTP won the protocol wars, Gopherspace still exists with active servers hosting unique content. This project resurrects Gopher by:

- Making it accessible through modern web browsers
- Providing a beautiful, themed interface that honors its retro origins
- Adding modern conveniences (bookmarks, history, PWA support)
- Demonstrating that "dead" technologies can be valuable when reimagined

## ✨ Features

- 🌐 **Full Gopher Protocol Support** - Browse Gopherspace through RFC 1436 compliant implementation
- 🎨 **Retro-Futuristic UI** - Dark theme with green phosphor text, glow effects, and CRT-style scanlines
- 🔖 **Bookmark Management** - Save and organize your favorite Gopher sites
- 📜 **Navigation History** - Track and revisit your browsing history (last 50 sites)
- 🔍 **Search Support** - Query Gopher search servers (type 7 items)
- 📱 **Progressive Web App** - Install and use offline with cached content
- ⚡ **Fast & Responsive** - Optimized performance with modern web technologies
- 🎯 **Multiple Item Types** - Support for text files, directories, images, downloads, and more

## 🛠 Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Node.js + Express (Gopher proxy server)
- **Protocol:** Gopher (RFC 1436) over raw TCP sockets
- **PWA:** Service Workers + Workbox for offline caching
- **Styling:** Pure CSS with retro terminal aesthetics
- **Testing:** Vitest + fast-check for property-based testing

## 🚀 Getting Started

**Quick Start:** See [QUICKSTART.md](QUICKSTART.md) for a 5-minute setup guide.

### Prerequisites

- Node.js 18+ 
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd gopher-browser

# Install all dependencies (root + workspaces)
npm install

# Start both backend and frontend servers
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001

### Try It Out

Once running, try these Gopher URLs:
- `gopher://gopher.floodgap.com` - Floodgap's Gopher server
- `gopher://gopher.quux.org` - Quux.org Gopher server
- `gopher://gopher.club` - Gopher Club
- `gopher://gopherpedia.com` - Wikipedia mirror

### Building for Production

```bash
# Build both frontend and backend
npm run build

# Frontend build output: frontend/dist/
# Backend build output: backend/dist/
```

## 📁 Project Structure

```
gopher-browser/
├── .kiro/
│   └── specs/gopher-browser/    # Spec-driven development artifacts
│       ├── requirements.md       # EARS-compliant requirements
│       ├── design.md            # Architecture & correctness properties
│       └── tasks.md             # Implementation task list
├── backend/
│   ├── src/
│   │   ├── GopherClient.ts      # TCP socket client for Gopher protocol
│   │   ├── GopherParser.ts      # RFC 1436 menu parser
│   │   ├── index.ts             # Express server & API routes
│   │   └── types.ts             # TypeScript interfaces
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── api/                 # API client
│   │   ├── utils/               # URL parsing, storage
│   │   ├── App.tsx              # Main application
│   │   └── types.ts             # TypeScript interfaces
│   └── package.json
└── package.json                 # Root workspace config
```

## 🎯 How Kiro Was Used

This project showcases **Kiro's spec-driven development** workflow:

### 1. Requirements Phase
- Created comprehensive requirements document with 8 major user stories
- Used EARS (Easy Approach to Requirements Syntax) patterns for clarity
- Defined 40+ acceptance criteria following INCOSE quality standards
- Established glossary of technical terms

### 2. Design Phase
- Developed detailed architecture with component diagrams
- Defined 19 correctness properties for property-based testing
- Specified error handling strategies
- Planned testing approach (unit + property-based tests)

### 3. Implementation Phase
- Generated 14 major implementation tasks with subtasks
- Followed incremental development approach
- Built features in logical order with checkpoints
- Maintained traceability from requirements → design → code

### 4. Key Kiro Features Used

**Spec-Driven Development:**
- Structured workflow from idea → requirements → design → tasks
- Iterative refinement with user approval at each phase
- Correctness properties as first-class design artifacts
- Property-based testing integration

**Benefits Observed:**
- Clear roadmap prevented scope creep
- Requirements traceability ensured nothing was missed
- Correctness properties guided implementation decisions
- Incremental approach allowed rapid iteration

The complete specification is in `.kiro/specs/gopher-browser/` - this directory demonstrates how Kiro structures complex projects for maintainability and correctness.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run backend tests only
npm test --workspace=backend

# Run frontend tests only
npm test --workspace=frontend
```

The project includes:
- **Unit tests** for core functionality
- **Property-based tests** using fast-check for correctness properties
- **Integration tests** for API endpoints

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

The `vercel.json` configuration handles both frontend and backend deployment.

### Manual Deployment

**Backend:**
- Deploy to Railway, Render, or any Node.js hosting
- Set `PORT` environment variable
- Run `npm run build && npm start` in backend directory

**Frontend:**
- Deploy to Netlify, Vercel, or any static hosting
- Set `VITE_API_URL` to your backend URL
- Run `npm run build` in frontend directory
- Serve the `frontend/dist` folder

## 🎨 Design Philosophy

The UI embraces the retro-futuristic aesthetic:
- **Green phosphor text** on black background (classic terminal look)
- **Glow effects** on interactive elements
- **CRT scanlines** overlay for authenticity
- **Monospace fonts** throughout
- **ASCII-style decorations** and borders
- **Smooth animations** that feel both retro and modern

## 📜 License

MIT License - Open Source

---

**Built with Kiro • Resurrection Category • Kiroween 2024**
