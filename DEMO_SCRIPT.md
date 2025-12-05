# Demo Script - Gopher Browser (3 Minutes)

This script is designed for a 3-minute demonstration video for the Kiroween Hackathon submission.

## Setup (Before Recording)

- [ ] Application running locally or deployed
- [ ] Browser window sized appropriately (1920x1080)
- [ ] Clear browser cache/history for clean demo
- [ ] Have URLs ready to copy/paste
- [ ] Test audio levels
- [ ] Close unnecessary applications

## Script

### Opening (0:00 - 0:20) - 20 seconds

**[Show title card with project name and category]**

**Narration:**
> "Welcome to Gopher Browser - a resurrection of the ancient Gopher protocol from 1991. Before the World Wide Web, there was Gopher - a simpler, text-based way to navigate the internet. Today, I'm bringing it back to life with modern web technologies and a haunting retro-futuristic interface."

**[Fade to application]**

### The Problem (0:20 - 0:40) - 20 seconds

**[Show empty browser with welcome screen]**

**Narration:**
> "Gopherspace still exists with hundreds of active servers, but there's no modern way to access it. You need special clients or command-line tools. My solution? A beautiful web application that makes Gopher accessible to everyone, with bookmarks, history, search, and even offline support."

### Demo: Basic Navigation (0:40 - 1:10) - 30 seconds

**[Type in address bar: gopher://gopher.floodgap.com]**

**Narration:**
> "Let's explore Gopherspace. I'll connect to Floodgap, one of the most popular Gopher servers."

**[Press GO, show loading animation]**

**[Menu appears with green phosphor text and glow effects]**

**Narration:**
> "Notice the retro terminal aesthetic - green phosphor text, glow effects, and CRT-style scanlines. Each menu item has an icon indicating its type: folders for directories, documents for text files, search icons for search servers."

**[Click on a directory item, show submenu]**

**[Click on a text file, show content with preserved formatting]**

**Narration:**
> "Navigation is instant, and text files display with proper formatting and line breaks."

### Demo: Modern Features (1:10 - 1:50) - 40 seconds

**[Click back button]**

**Narration:**
> "But this isn't just a retro clone - it has modern conveniences."

**[Click bookmark button (star)]**

**Narration:**
> "I can bookmark pages for later."

**[Click bookmarks panel button]**

**[Show bookmarks panel sliding in]**

**Narration:**
> "All my bookmarks are saved locally and sorted by recency."

**[Close bookmarks, click history button]**

**[Show history panel]**

**Narration:**
> "There's a full navigation history tracking the last 50 sites I've visited."

**[Close history panel]**

**[Navigate to a page with a search item (type 7)]**

**[Show search input appearing]**

**Narration:**
> "And when I encounter a Gopher search server, a search box appears automatically. I can query the server just like a modern search engine."

**[Type a search query and submit]**

**[Show search results]**

### Technical Implementation (1:50 - 2:30) - 40 seconds

**[Switch to code editor or show architecture diagram]**

**Narration:**
> "Under the hood, this is a full-stack TypeScript application. The backend is a Node.js proxy server that handles raw TCP connections to Gopher servers, parsing the RFC 1436 protocol. The frontend is a React app with a retro-themed UI, local storage for bookmarks and history, and service workers for offline caching."

**[Show .kiro/specs folder]**

**Narration:**
> "But here's what makes this special: I built it using Kiro's spec-driven development. I started with formal requirements using EARS syntax, created a comprehensive design with 19 correctness properties, and generated an implementation plan with 14 major tasks. Every line of code traces back to a requirement. Every feature has property-based tests validating correctness."

**[Show requirements.md or design.md briefly]**

### PWA Demo (2:30 - 2:50) - 20 seconds

**[Switch back to browser]**

**[Show install prompt or installed app icon]**

**Narration:**
> "It's also a Progressive Web App. You can install it on your phone or desktop and use it offline. Previously visited pages are cached, so you can browse Gopherspace even without internet."

**[Show offline mode or cached content]**

### Closing (2:50 - 3:00) - 10 seconds

**[Show application with multiple features visible]**

**Narration:**
> "Gopher Browser - bringing dead technology back to life with modern innovations. Built with Kiro, powered by specs, and ready to explore Gopherspace. Thank you!"

**[Fade to end card with links]**

## End Card (Show for 5 seconds)

- Project Name: Gopher Browser
- Category: Resurrection
- GitHub: [Your repo URL]
- Live Demo: [Your deployment URL]
- Built with Kiro

## Tips for Recording

### Visual Tips:
- Use screen recording software (OBS, Loom, or QuickTime)
- Record at 1920x1080 resolution
- Use a clean browser window (no bookmarks bar, extensions, etc.)
- Zoom in on important UI elements
- Use cursor highlighting if available

### Audio Tips:
- Use a good microphone (not laptop mic)
- Record in a quiet room
- Speak clearly and at moderate pace
- Add background music (low volume, retro/synthwave theme)
- Use audio editing to remove pauses and "ums"

### Editing Tips:
- Add smooth transitions between sections
- Highlight important features with zoom or arrows
- Add text overlays for key points
- Keep it under 3 minutes (judges won't watch longer)
- Export at high quality (1080p, 60fps if possible)

## Alternative: Live Demo

If doing a live demo instead of pre-recorded:

1. **Practice multiple times** - know exactly what to click
2. **Have backup URLs** - in case a server is down
3. **Prepare for errors** - have a plan if something breaks
4. **Time yourself** - stay under 3 minutes
5. **Have notes** - but don't read them verbatim

## B-Roll Ideas

If you have extra time, add B-roll footage:
- Close-ups of the retro UI elements
- Animated transitions between features
- Code snippets with syntax highlighting
- Architecture diagrams
- Property-based test examples
- Spec documents

## Music Suggestions

Royalty-free music that fits the theme:
- Synthwave/retrowave tracks
- Cyberpunk ambient
- 80s-style electronic music
- Chiptune/8-bit music

Sources:
- YouTube Audio Library
- Epidemic Sound
- Artlist
- Free Music Archive

## Checklist Before Uploading

- [ ] Video is under 3 minutes
- [ ] Audio is clear and balanced
- [ ] All features are demonstrated
- [ ] Kiro usage is explained
- [ ] Video is public on YouTube/Vimeo/Facebook
- [ ] Title includes "Kiroween" and "Gopher Browser"
- [ ] Description includes links and category
- [ ] Thumbnail is eye-catching

---

**Good luck with your demo! 🎬**
