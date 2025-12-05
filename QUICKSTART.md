# Quick Start Guide - Gopher Browser

Get up and running in 5 minutes!

## Prerequisites

- Node.js 18 or higher ([Download here](https://nodejs.org/))
- npm (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd gopher-browser

# 2. Install dependencies
npm install

# 3. Start the application
npm run dev
```

That's it! The application will start automatically.

## Access the Application

Open your browser and go to:
```
http://localhost:5173
```

## Try It Out

1. **Enter a Gopher URL** in the address bar:
   ```
   gopher://gopher.floodgap.com
   ```

2. **Click GO** or press Enter

3. **Explore!** Click on menu items to navigate

## Popular Gopher Servers to Try

- `gopher://gopher.floodgap.com` - Floodgap Systems (most popular)
- `gopher://gopher.quux.org` - Quux.org
- `gopher://gopher.club` - Gopher Club
- `gopher://gopherpedia.com` - Wikipedia mirror
- `gopher://gopher.black` - Gopher Black

## Features to Test

### Bookmarks
1. Navigate to any page
2. Click the ★ button
3. Click 📚 to view bookmarks

### History
1. Navigate to several pages
2. Click 📜 to view history
3. Use the ← back button

### Search
1. Find a page with a 🔍 search icon
2. Enter a query in the search box
3. View results

### PWA (Mobile)
1. Open on mobile browser
2. Look for "Install" prompt
3. Add to home screen

## Troubleshooting

### "Cannot connect to server"
- Some Gopher servers may be slow or offline
- Try a different server
- Wait a few seconds and retry

### "Port already in use"
- Stop other applications using port 3001 or 5173
- Or change ports in package.json

### "Module not found"
- Run `npm install` again
- Delete `node_modules` and reinstall

### Frontend not loading
- Check that both servers are running
- Look for errors in terminal
- Try clearing browser cache

## Development

### Backend Only
```bash
npm run dev:backend
```
Runs on http://localhost:3001

### Frontend Only
```bash
npm run dev:frontend
```
Runs on http://localhost:5173

### Run Tests
```bash
npm test
```

### Build for Production
```bash
npm run build
```

## Project Structure

```
gopher-browser/
├── backend/          # Node.js server
│   └── src/
│       ├── GopherClient.ts    # TCP connection handler
│       ├── GopherParser.ts    # RFC 1436 parser
│       └── index.ts           # Express server
├── frontend/         # React app
│   └── src/
│       ├── components/        # UI components
│       ├── App.tsx           # Main app
│       └── types.ts          # TypeScript types
└── .kiro/           # Kiro specs
    └── specs/gopher-browser/
        ├── requirements.md
        ├── design.md
        └── tasks.md
```

## Next Steps

- Read [README.md](README.md) for full documentation
- Check [KIRO_USAGE.md](KIRO_USAGE.md) to learn about spec-driven development
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options
- Review [DEMO_SCRIPT.md](DEMO_SCRIPT.md) for video ideas

## Need Help?

- Check the [README.md](README.md)
- Look at the [.kiro/specs](/.kiro/specs/gopher-browser/) directory
- Open an issue on GitHub
- Ask in the Kiroween Discord

## Tips

- **Gopher is slow** - It's a 1991 protocol, be patient!
- **Not all servers work** - Some are offline or slow
- **Text-only** - Gopher is primarily text-based
- **Explore!** - There's interesting content in Gopherspace

---

**Happy Gophering! 🔮**
