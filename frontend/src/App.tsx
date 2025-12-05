import { useState, useEffect } from 'react';
import { GopherUrl, ParsedGopherContent, Bookmark, HistoryEntry, GopherMenuItem } from './types';
import { parseGopherUrl, buildGopherUrl, buildGopherUrlFromItem } from './utils/gopherUrl';
import { fetchGopherContent } from './api/gopherApi';
import { loadBookmarks, saveBookmarks, loadHistory, saveHistory, clearHistory as clearStoredHistory } from './utils/storage';
import AddressBar from './components/AddressBar';
import ContentDisplay from './components/ContentDisplay';
import BookmarkPanel from './components/BookmarkPanel';
import HistoryPanel from './components/HistoryPanel';
import './App.css';

function App() {
  const [currentUrl, setCurrentUrl] = useState<GopherUrl | null>(null);
  const [content, setContent] = useState<ParsedGopherContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState<'green' | 'amber' | 'white'>('green');
  const [hasPlayedLaugh, setHasPlayedLaugh] = useState(false);

  const playSpookyLaugh = () => {
    if (hasPlayedLaugh) return;
    setHasPlayedLaugh(true);
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const duration = 1.5;
      
      // Create retro computer boot-up sound
      const osc = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      osc.type = 'square';
      
      const now = audioContext.currentTime;
      
      // Classic computer boot sequence: low beep, rising tone, high beep
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.15);
      osc.frequency.linearRampToValueAtTime(800, now + 0.6);
      osc.frequency.setValueAtTime(1200, now + 0.7);
      osc.frequency.setValueAtTime(1200, now + 0.85);
      
      // Volume envelope
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.15);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
      gainNode.gain.setValueAtTime(0, now + 0.3);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.35);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.6);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.65);
      gainNode.gain.setValueAtTime(0, now + 0.7);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.75);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.9);
      
      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // Ignore audio errors
      console.log('Audio not supported', e);
    }
  };

  // Play laugh on first user interaction
  useEffect(() => {
    const handleFirstClick = () => {
      playSpookyLaugh();
      document.removeEventListener('click', handleFirstClick);
    };
    
    document.addEventListener('click', handleFirstClick);
    
    return () => {
      document.removeEventListener('click', handleFirstClick);
    };
  }, [hasPlayedLaugh]);

  // Load bookmarks and history on mount
  useEffect(() => {
    setBookmarks(loadBookmarks());
    setHistory(loadHistory());
  }, []);

  const playModemSound = () => {
    // Create a simple modem-like sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const duration = 0.8;
    
    // Create oscillators for that classic modem sound
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Modem-like frequencies
    osc1.frequency.setValueAtTime(1200, audioContext.currentTime);
    osc2.frequency.setValueAtTime(2400, audioContext.currentTime);
    
    // Fade in and out
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
    
    osc1.start(audioContext.currentTime);
    osc2.start(audioContext.currentTime);
    osc1.stop(audioContext.currentTime + duration);
    osc2.stop(audioContext.currentTime + duration);
  };

  const navigate = async (url: string, addToHistory = true, searchQuery?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Play modem sound!
      try {
        playModemSound();
      } catch (e) {
        // Ignore audio errors
      }

      const parsed = parseGopherUrl(url);
      setCurrentUrl(parsed);

      const result = await fetchGopherContent({
        host: parsed.host,
        port: parsed.port,
        selector: parsed.selector,
        searchQuery
      });

      setContent(result);

      // Add to history
      if (addToHistory) {
        const title = result.isMenu ? `${parsed.host}` : `${parsed.host}${parsed.selector}`;
        const newEntry: HistoryEntry = {
          url,
          title,
          timestamp: Date.now()
        };
        const newHistory = [newEntry, ...history];
        setHistory(newHistory);
        saveHistory(newHistory);
        setHistoryIndex(0);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
      setContent(null);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToItem = (item: GopherMenuItem) => {
    // Handle HTML links
    if (item.type === 'h' && item.selector.startsWith('URL:')) {
      const url = item.selector.substring(4);
      window.open(url, '_blank');
      return;
    }

    // Handle download links
    if (item.type === '9' || item.type === 'g') {
      // For now, just navigate - could implement download later
      const url = buildGopherUrlFromItem(item);
      navigate(url);
      return;
    }

    // Regular navigation
    const url = buildGopherUrlFromItem(item);
    navigate(url);
  };

  const handleSearch = (item: GopherMenuItem, query: string) => {
    const url = buildGopherUrlFromItem(item);
    navigate(url, true, query);
  };

  const handleBack = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      navigate(history[newIndex].url, false);
    }
  };

  const handleBookmark = () => {
    if (!currentUrl) return;

    const url = buildGopherUrl(currentUrl);
    const title = `${currentUrl.host}${currentUrl.selector}`;
    
    // Check if already bookmarked
    if (bookmarks.some(b => b.url === url)) {
      alert('Already bookmarked!');
      return;
    }

    const newBookmark: Bookmark = {
      id: crypto.randomUUID(),
      url,
      title,
      timestamp: Date.now()
    };

    const newBookmarks = [newBookmark, ...bookmarks];
    setBookmarks(newBookmarks);
    saveBookmarks(newBookmarks);
  };

  const handleDeleteBookmark = (id: string) => {
    const newBookmarks = bookmarks.filter(b => b.id !== id);
    setBookmarks(newBookmarks);
    saveBookmarks(newBookmarks);
  };

  const handleClearHistory = () => {
    setHistory([]);
    clearStoredHistory();
    setHistoryIndex(-1);
  };

  const cycleTheme = () => {
    const themes: Array<'green' | 'amber' | 'white'> = ['green', 'amber', 'white'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <div className={`app theme-${theme}`}>
      <header className="app-header">
        <h1 className="app-title">
          <span className="gopher-icon">🔮</span>
          GOPHER BROWSER
          <span className="subtitle">// RESURRECTION</span>
        </h1>
        <button className="theme-toggle" onClick={cycleTheme} title="Change theme">
          🎨 {theme.toUpperCase()}
        </button>
      </header>

      <AddressBar
        currentUrl={currentUrl ? buildGopherUrl(currentUrl) : ''}
        onNavigate={navigate}
        onBack={handleBack}
        onBookmark={handleBookmark}
        canGoBack={historyIndex < history.length - 1}
        onToggleBookmarks={() => setShowBookmarks(!showBookmarks)}
        onToggleHistory={() => setShowHistory(!showHistory)}
      />

      <div className="main-content">
        {showBookmarks && (
          <BookmarkPanel
            bookmarks={bookmarks}
            onNavigate={navigate}
            onDelete={handleDeleteBookmark}
            onClose={() => setShowBookmarks(false)}
          />
        )}

        {showHistory && (
          <HistoryPanel
            history={history}
            onNavigate={navigate}
            onClear={handleClearHistory}
            onClose={() => setShowHistory(false)}
          />
        )}

        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Connecting to Gopherspace...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <h2>⚠ ERROR</h2>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && content && (
          <ContentDisplay
            content={content}
            onNavigate={handleNavigateToItem}
            onSearch={handleSearch}
          />
        )}

        {!loading && !error && !content && (
          <div className="welcome">
            <pre className="ascii-art">{`
   _____ ____  _____  _    _ ______ _____  
  / ____|  _ \\|  __ \\| |  | |  ____|  __ \\ 
 | |  __| |_) | |__) | |__| | |__  | |__) |
 | | |_ |  _ <|  ___/|  __  |  __| |  _  / 
 | |__| | |_) | |    | |  | | |____| | \\ \\ 
  \\_____|____/|_|    |_|  |_|______|_|  \\_\\
                                            
        PROTOCOL RESURRECTION • EST. 1991
            `}</pre>
            <h2>Welcome to Gopherspace</h2>
            <p>Enter a Gopher URL to begin exploring the ancient internet.</p>
            <div className="example-links">
              <h3>🔮 Popular Gopher Servers:</h3>
              <button onClick={() => navigate('gopher://gopher.floodgap.com')}>
                🌊 Floodgap Systems
              </button>
              <button onClick={() => navigate('gopher://gopher.quux.org')}>
                🎯 Quux.org
              </button>
              <button onClick={() => navigate('gopher://gopherpedia.com')}>
                📚 Gopherpedia (Wikipedia Mirror)
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="app-footer">
        <p>
          Gopher Protocol (RFC 1436) • Built for Kiroween 2024 • 
          {bookmarks.length} Bookmarks • {history.length} Sites Visited
        </p>
      </footer>
    </div>
  );
}

export default App;
