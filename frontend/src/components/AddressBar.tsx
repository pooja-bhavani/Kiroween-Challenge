import { useState, FormEvent } from 'react';
import './AddressBar.css';

interface AddressBarProps {
  currentUrl: string;
  onNavigate: (url: string) => void;
  onBack: () => void;
  onBookmark: () => void;
  canGoBack: boolean;
  onToggleBookmarks: () => void;
  onToggleHistory: () => void;
}

export default function AddressBar({
  currentUrl,
  onNavigate,
  onBack,
  onBookmark,
  canGoBack,
  onToggleBookmarks,
  onToggleHistory
}: AddressBarProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onNavigate(inputValue.trim());
    }
  };

  return (
    <div className="address-bar">
      <button
        className="nav-button"
        onClick={onBack}
        disabled={!canGoBack}
        title="Back"
      >
        ←
      </button>

      <form onSubmit={handleSubmit} className="url-form">
        <input
          type="text"
          className="url-input"
          placeholder="gopher://hostname:port/type/selector"
          value={inputValue || currentUrl}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="go-button">
          GO
        </button>
      </form>

      <button
        className="action-button"
        onClick={onBookmark}
        disabled={!currentUrl}
        title="Bookmark this page"
      >
        ★
      </button>

      <button
        className="action-button"
        onClick={onToggleBookmarks}
        title="Show bookmarks"
      >
        📚
      </button>

      <button
        className="action-button"
        onClick={onToggleHistory}
        title="Show history"
      >
        📜
      </button>
    </div>
  );
}
