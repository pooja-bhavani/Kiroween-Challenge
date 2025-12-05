import { Bookmark } from '../types';
import './Panel.css';

interface BookmarkPanelProps {
  bookmarks: Bookmark[];
  onNavigate: (url: string) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export default function BookmarkPanel({ bookmarks, onNavigate, onDelete, onClose }: BookmarkPanelProps) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h2>📚 BOOKMARKS</h2>
        <button className="close-button" onClick={onClose}>✕</button>
      </div>
      <div className="panel-content">
        {bookmarks.length === 0 ? (
          <p className="empty-message">No bookmarks yet. Click ★ to bookmark a page.</p>
        ) : (
          <div className="item-list">
            {bookmarks.map((bookmark) => (
              <div key={bookmark.id} className="panel-item">
                <button
                  className="item-link"
                  onClick={() => {
                    onNavigate(bookmark.url);
                    onClose();
                  }}
                >
                  <div className="item-title">{bookmark.title}</div>
                  <div className="item-url">{bookmark.url}</div>
                </button>
                <button
                  className="delete-button"
                  onClick={() => onDelete(bookmark.id)}
                  title="Delete bookmark"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
