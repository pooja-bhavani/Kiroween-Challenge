import { ParsedGopherContent, GopherMenuItem } from '../types';
import SearchInput from './SearchInput';
import './ContentDisplay.css';

interface ContentDisplayProps {
  content: ParsedGopherContent;
  onNavigate: (item: GopherMenuItem) => void;
  onSearch?: (item: GopherMenuItem, query: string) => void;
}

function getItemIcon(type: string): string {
  const icons: Record<string, string> = {
    '0': '📄', // Text file
    '1': '📁', // Directory
    '3': '⚠️', // Error
    '7': '🔍', // Search
    '8': '📡', // Telnet
    '9': '💾', // Binary
    'g': '🖼️', // GIF
    'h': '🔗', // HTML
    'i': '  ', // Info (no icon)
    'I': '🖼️', // Image
    's': '🔊', // Sound
  };
  return icons[type] || '❓';
}

function isClickable(type: string): boolean {
  // Type 'i' is informational only, not clickable
  return type !== 'i';
}

function isError(type: string): boolean {
  return type === '3';
}

function isBinary(type: string): boolean {
  return type === '9' || type === 'g';
}

export default function ContentDisplay({ content, onNavigate, onSearch }: ContentDisplayProps) {
  if (content.isMenu && content.items) {
    // Check if there's a search item (type 7)
    const searchItem = content.items.find(item => item.type === '7');

    return (
      <div className="content-display menu">
        {searchItem && onSearch && (
          <SearchInput onSearch={(query) => onSearch(searchItem, query)} />
        )}
        {content.items.map((item, index) => {
          const clickable = isClickable(item.type);
          const error = isError(item.type);
          const binary = isBinary(item.type);
          
          const className = `menu-item ${!clickable ? 'info' : ''} ${error ? 'error' : ''} ${binary ? 'binary' : ''}`;

          if (!clickable) {
            return (
              <div key={index} className={className}>
                <span className="item-icon">{getItemIcon(item.type)}</span>
                <span className="item-display">{item.display}</span>
              </div>
            );
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => onNavigate(item)}
            >
              <span className="item-icon">{getItemIcon(item.type)}</span>
              <span className="item-display">{item.display}</span>
              {binary && <span className="download-badge">[DOWNLOAD]</span>}
            </button>
          );
        })}
      </div>
    );
  }

  if (content.text !== undefined) {
    return (
      <div className="content-display text">
        <pre>{content.text}</pre>
      </div>
    );
  }

  return (
    <div className="content-display empty">
      <p>No content to display</p>
    </div>
  );
}
